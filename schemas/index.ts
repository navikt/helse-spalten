import nyhet from './nyheter/nyhet'
import driftsmelding from './driftsmeldinger/driftsmelding'
import subdomene from './varsler/subdomene'
import kontekst from './varsler/kontekst'
import varsel from './varsler/varsel'
import skjonnsfastsettelseMal from './skjønnsfastsettelse/mal'
import lovhjemmel from './skjønnsfastsettelse/lovhjemmel'
import avslag from './avslag/mal'
import årsaker from './årsaker/årsaker'
import customPortableText from './nyheter/customPortableText'
import informasjonsmelding from './driftsmeldinger/informasjonsmelding'
import statusoppdatering from './driftsmeldinger/statusoppdatering'
import vilkår, { vilkårAlternativ, vilkårskode } from './kodeverk/vilkår'
import { avgjørelse, avgjørelsealternativ, avgjørelseskode } from './kodeverk/avgjørelse'

export const schemaTypes = [
    nyhet,
    driftsmelding,
    informasjonsmelding,
    statusoppdatering,
    subdomene,
    kontekst,
    varsel,
    skjonnsfastsettelseMal,
    lovhjemmel,
    avslag,
    årsaker,
    customPortableText,
    vilkårskode,
    vilkår,
    vilkårAlternativ,
    avgjørelse,
    avgjørelseskode,
    avgjørelsealternativ,
]
