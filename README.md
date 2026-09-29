# Spalten

[🔗 Spalten i prod](https://spalten.sanity.studio/)

## Beskrivelse

Spalten er et støtteverktøy som gir mulighet til å redigere tekstfelt i saksbehandlerløsningen Speil ved hjelp av Sanity.

Sanity er et såkalt "hodeløst CMS" (Headless Content Management System) som gir utviklere og innholdsskapere en moderne måte å administrere innhold på. Ler mer om sanity på [Graphiq](https://www.graphiq.design/verktoy/web/v/sanity/r/recRHeHhrBoevsvmQ) eller [Sanity](https://www.sanity.io/)

_Hva brukes Spalten til nå?_

- Endring av maler for skjønnsmessig fastsettelse § 8-30, 2. ledd og 3. ledd
  - Årsak, begrunnelse og konklusjon
- Aktivering/deaktivering av skriftlige maler i produksjon
- Oversikt over varsler
- Opprettelse av driftsmeldinger
- Opprettelse av informasjonsmeldinger
- Opprettelse av nyheter
- Endring av Annulleringsårsaker
- Endring av På vent-årsaker

## Kom i gang

### Tilgang

- Legg til sanity.io i [My Apps](http://myapplications.microsoft.com/).
- Åpne spalten, trykk på navnet ditt øverst i høyre hjørne -> `Manage project`.
- Logg inn med SSO -> organisasjon er navikt
- Velg `Members`.
- Be en developer eller admin om developer-tilgang så du kan deploye.

For å kunne foreta endringer i Spalten må du være medlem av AzureAD-gruppen tbd.

### Utvikle lokalt

1. Installer prosjektet - `pnpm install`
2. Opprett en lokal miljøfil (`.env.local`) og sett følgende variabel `SANITY_STUDIO_DATASET=local-development`.
3. Kjør Spalten lokalt - `pnpm run dev`

For lokal utvikling må du ha en .env.local-fil. Applikasjonen bruker da et eget Sanity-datasett (local-development).
Lokal Speil kobler seg til dette i stedet for produksjons-datasettet.


## Hvordan lage driftsmelding

En driftsmelding brukes ved driftsforstyrrelser i Speil, for eksempel treghet eller nedetid. Den
lages under `Driftsmeldinger` → `Meldinger` → `Driftsmeldinger` og består av én eller flere
**statuser** (tidspunkt settes automatisk). Den første statusen må ha **konsekvens** (treghet /
delvis mulig / ikke mulig å saksbehandle – bestemmer tittel og farge), **årsak** og **tiltak**, og
kan i tillegg ha «Hva kan jobbes med?» og «Oppdatering». Senere statuser fyller du som regel bare
ut «Oppdatering» med det som har endret seg. Speil viser nyeste status øverst og resten som logg
under «Tidligere statuser».

Velg om meldingen skal vises i dev (standard `Nei`) og prod (standard `Ja`), og publiser med
`Publish`. Uten publisering lages ingen melding. Når problemet er løst, sett `Er problemet løst?`
til `Ja`. Meldingen blir grønn med status «løst» og forsvinner automatisk etter 30 minutter.

## Hvordan lage informasjonsmelding

En informasjonsmelding informerer saksbehandlere om noe som ikke er en driftsforstyrrelse. Den
lages under `Driftsmeldinger` → `Meldinger` → `Informasjonsmeldinger`, med tittel, beskrivelse og
et «Synlig til»-tidspunkt (standard 4 timer frem). Velg synlighet i dev (standard `Nei`) og prod
(standard `Ja`), og publiser med `Publish` for at meldingen skal vises.

## Hvordan lage nyhet

En nyhet vises i Nytt i Speil-modal og forklarer hvilke endringer som er gjort for
saksbehandlerne. Den lages under `Nyheter`, med tittel, beskrivelse og lanseringsdato. Valgfritt
kan du legge til en lenke til mer informasjon og en «Se hvordan»-modal med inntil tre slides, som
kan settes til å vises automatisk. Nyheten blir synlig for saksbehandlere i prod først når
`Vis i prod?` er på og du har publisert med `Publish`.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

Interne henvendelser kan sendes via Slack i kanalen [#team-sas-værsågod](https://nav-it.slack.com/archives/C019637N90X).
