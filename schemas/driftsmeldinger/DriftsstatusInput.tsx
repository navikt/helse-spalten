import { useEffect, useRef } from 'react'
import { isKeySegment, ObjectInputProps, Path, useFormValue } from 'sanity'

export const HOVEDINNHOLD_FIELDSET = 'hovedinnhold'

/**
 * Fieldsettet «hovedinnhold» (konsekvens, årsak, tiltak, cta) er kollapset i skjemaet, slik at
 * redaktøren i senere statuser kun ser «Oppdatering». Den første statusen beskriver hele
 * driftsmeldingen, og der skal feltene være synlige med en gang.
 */
export function DriftsstatusInput(props: ObjectInputProps): React.JSX.Element {
    useÅpneHovedinnholdForFørsteStatus(props)

    return props.renderDefault(props)
}

function useÅpneHovedinnholdForFørsteStatus(props: ObjectInputProps): void {
    const { onFieldSetExpand } = props
    const erFørsteStatus = useErFørsteStatus(props.path)
    const erÅpnet = useRef(false)

    useEffect(() => {
        if (!erFørsteStatus || erÅpnet.current) return

        erÅpnet.current = true
        onFieldSetExpand(HOVEDINNHOLD_FIELDSET)
    }, [erFørsteStatus, onFieldSetExpand])
}

/**
 * Stien til et array-element ender på `{_key}`, så statusen finner seg selv ved å sammenligne nøkkelen
 * med det første elementet i lista den ligger i.
 */
function useErFørsteStatus(path: Path): boolean {
    const statuser = useFormValue(path.slice(0, -1))
    const egetSegment = path.at(-1)

    if (!Array.isArray(statuser) || egetSegment === undefined || !isKeySegment(egetSegment)) {
        // Uten liste eller nøkkel kan vi ikke plassere statusen. Da viser vi heller feltene enn å
        // skjule innhold redaktøren trenger.
        return true
    }

    const førsteKey = (statuser[0] as { _key?: string } | undefined)?._key
    return førsteKey === egetSegment._key
}
