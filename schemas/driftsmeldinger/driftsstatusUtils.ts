export const konsekvensValg = [
    { title: 'Treghet i speil', value: 'treghet' },
    { title: 'Delvis mulig å saksbehandle i speil', value: 'delvisMulig' },
    { title: 'Ikke mulig å saksbehandle i speil', value: 'ikkeMulig' },
]

export const konsekvensTekster: Record<string, string> = Object.fromEntries(
    konsekvensValg.map(({ title, value }) => [value, title]),
)

export interface Driftsstatus {
    _key?: string
    tidspunkt?: string
    konsekvens?: string
    arsak?: string
    tiltak?: string
    oppdatering?: string
    cta?: string
}

/**
 * Konsekvensen settes bare når den endrer seg, så vi går bakover i lista til vi finner den siste
 * som faktisk er satt. Den bestemmer tittel og ikon på driftsmeldingen i Studio-lista.
 */
export function gjeldendeKonsekvens(statuser: Driftsstatus[] | undefined): string | undefined {
    return statuser?.findLast((status) => erUtfylt(status.konsekvens))?.konsekvens
}

export function formatterTidspunkt(tidspunkt: string | undefined): string {
    const tid = tidspunkt ? new Date(tidspunkt) : undefined
    if (!tid || Number.isNaN(tid.getTime())) return 'Uten tidspunkt'

    return tid.toLocaleString('nb-NO', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

const innholdsfelter = ['konsekvens', 'arsak', 'tiltak', 'oppdatering', 'cta'] as const

const påkrevdIFørsteStatus: [keyof Driftsstatus, string][] = [
    ['konsekvens', 'Konsekvens'],
    ['arsak', 'Årsak'],
    ['tiltak', 'Tiltak'],
]

type Valideringsfeil = {
    message: string
    path: (string | { _key: string })[]
}

/**
 * Bare den første statusen må beskrive driftsmeldingen i sin helhet. Senere statuser fyller som
 * regel bare ut «Oppdatering». Feltnivå-validering kan ikke uttrykke dette, siden et felt ikke vet
 * hvor i lista det ligger — derfor valideres hele arrayet under ett, med feilmeldinger pekt mot
 * riktig felt.
 */
export function validerStatuser(statuser: Driftsstatus[] | undefined): true | Valideringsfeil[] {
    if (!Array.isArray(statuser) || statuser.length === 0) return true

    const [førsteStatus, ...alleAndreStatuser] = statuser
    const feil: Valideringsfeil[] = []

    for (const [felt, tittel] of påkrevdIFørsteStatus) {
        if (!erUtfylt(førsteStatus[felt])) {
            feil.push({
                message: `${tittel} må fylles ut i den første statusen`,
                path: [{ _key: førsteStatus._key ?? '' }, felt],
            })
        }
    }

    for (const status of alleAndreStatuser) {
        if (!innholdsfelter.some((felt) => erUtfylt(status[felt]))) {
            feil.push({
                message: 'Fyll ut minst ett felt, ellers endrer ikke statusen noe',
                path: [{ _key: status._key ?? '' }, 'oppdatering'],
            })
        }
    }

    return feil.length > 0 ? feil : true
}

export function erUtfylt(verdi: string | undefined): boolean {
    return typeof verdi === 'string' && verdi.trim().length > 0
}
