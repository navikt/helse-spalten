import nyhet from './nyheter/nyhet'
import driftsmelding from './driftsmeldinger/driftsmelding'
import subdomene from './varsler/subdomene'
import kontekst from './varsler/kontekst'
import varsel from './varsler/varsel'
import skjonnsfastsettelseMal from './skjønnsfastsettelse/mal'
import lovhjemmel from './skjønnsfastsettelse/lovhjemmel'
import avslag from './avslag/mal'
import årsaker from './årsaker/årsaker'
import blockContent from './nyheter/blockContent'

export const schemaTypes = [
    nyhet,
    driftsmelding,
    subdomene,
    kontekst,
    varsel,
    skjonnsfastsettelseMal,
    lovhjemmel,
    avslag,
    årsaker,
    blockContent,
]
