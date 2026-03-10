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
import vilkårskode from './kodeverk/vilkårskode'
import vilkår from './kodeverk/vilkår'
import { muligVurdering } from './kodeverk/vurdering'

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
    muligVurdering,
]
