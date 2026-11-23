import avslag from './avslag/mal';
import dialogmeldingmal from './dialogmeldingmaler/mal';
import driftsmelding from './driftsmeldinger/driftsmelding';
import driftsstatus from './driftsmeldinger/driftsstatus';
import informasjonsmelding from './driftsmeldinger/informasjonsmelding';
import { avgjørelse, avgjørelsealternativ, avgjørelseskode } from './kodeverk/avgjørelse';
import vilkår, { vilkårAlternativ, vilkårLovhenvisning, vilkårskode } from './kodeverk/vilkår';
import customPortableText from './nyheter/customPortableText';
import nyhet from './nyheter/nyhet';
import lovhjemmel from './skjønnsfastsettelse/lovhjemmel';
import skjonnsfastsettelseMal from './skjønnsfastsettelse/mal';
import kontekst from './varsler/kontekst';
import subdomene from './varsler/subdomene';
import varsel from './varsler/varsel';
import årsaker from './årsaker/årsaker';

export const schemaTypes = [
    nyhet,
    driftsmelding,
    informasjonsmelding,
    driftsstatus,
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
    vilkårLovhenvisning,
    avgjørelse,
    avgjørelseskode,
    avgjørelsealternativ,
    dialogmeldingmal,
];
