import { Stack, Text, TextInput } from '@sanity/ui'
import { InputProps, SanityClient, unset, set, useClient, useFormValue, FieldProps } from 'sanity'
import React, { useCallback, useEffect, useState } from 'react'

interface Varseldefinisjon {
    subdomene: {
        _ref: string
        _type: string
    }
    kontekst: {
        _ref: string
        _type: string
    }
    varselkode: string | undefined
}
const VarselkodeInput = (props: InputProps) => {
    const { onChange, elementProps, value } = props
    const client = useClient({ apiVersion: '2022-12-07' })
    const definisjon = useFormValue([]) as Varseldefinisjon
    const subdomene = definisjon.subdomene
    const kontekst = definisjon.kontekst
    useEffect(() => {
        const get = async () => {
            return await getVarselkode(client, subdomene._ref, kontekst._ref).then((it) => {
                return it
            })
        }
        if (!value) get().then((it) => onChange(set(it)))
    }, [])

    return (
        <Stack space={3}>
            <TextInput
                {...elementProps}
                size={1}
                value={(value as string) ?? ''}
                disabled={true}
            ></TextInput>
        </Stack>
    )
}

interface Varselkode {
    subdomene: string
    kontekst: string
    nummer: number
}

interface Varsel {
    varselkode: string
    kontekst: string
    subdomene: string
}

const getVarselkoder = async (
    client: SanityClient,
    subdomene: string,
    kontekst: string,
): Promise<Varselkode[]> => {
    const query = `*[_type=="varsel" && subdomene._ref == $subdomene && kontekst._ref == $kontekst]{'varselkode': varselkode, 'kontekst': kontekst->forkortelse, 'subdomene': subdomene->forkortelse}`
    return client
        .fetch(query, { subdomene: subdomene, kontekst: kontekst }, { perspective: 'published' })
        .then((it: Varsel[]) =>
            it.map((it) => ({
                subdomene: it.subdomene,
                kontekst: it.kontekst,
                nummer: Number(it.varselkode.split('_')[2]),
            })),
        )
}

const getVarselkode = async (
    client: SanityClient,
    subdomene: string,
    kontekst: string,
): Promise<string> => {
    const varselkoder = await getVarselkoder(client, subdomene, kontekst)
    if (varselkoder.length > 0)
        return `${varselkoder[0].subdomene}_${varselkoder[0].kontekst}_${
            Math.max(...varselkoder.map((it) => it.nummer)) + 1
        }`

    const getSubdomeneQuery = `*[_type=='subdomene' && _id==$subdomene]{forkortelse}[0]`
    const getKontekstQuery = `*[_type=='kontekst' && _id==$kontekst]{forkortelse}[0]`

    const subdomeneForkortelse = await client
        .fetch(getSubdomeneQuery, { subdomene: subdomene })
        .then((it) => it.forkortelse as string)
    const kontekstForkortelse = await client
        .fetch(getKontekstQuery, { kontekst: kontekst })
        .then((it) => it.forkortelse as string)

    return `${subdomeneForkortelse}_${kontekstForkortelse}_1`
}

export default VarselkodeInput
