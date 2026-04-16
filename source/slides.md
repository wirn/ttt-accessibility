# a11y i praktiken

- Arbetsförmedlingen (2019)
- SEB (2022)
- Swedbank (2025)


---

# Varför

- Lagkrav
- Affär
- Kvalitet
- Risk

<!-- detta är inte valfritt -->
<!-- vi stänger ute användare annars -->
<!-- dålig a11y = dålig kod, kodstandard -->
<!-- PTS-granskning -->
<!-- Tillgänglighet är inte en feature – det är en kvalitetsnivå. -->

---

# Vad är tillgänglighet?

Att alla kan använda tjänsten

Oavsett:
- Syn
- Motorik
- Kognition
- Teknik

<!-- skärmläsare etc. -->

---

# Vem är det för?

- Sensoriska funktionsnedsättningar
- Motoriska funktionsnedsättningar
- Kognitiva och neuropsykiatriska funktionsnedsättningar
- Äldre personer
- Tillfälliga funktionsnedsättningar
- Situationsbaserade begränsningar

<!-- syn, hörsel -->
<!-- t.ex. dyslexi, ADHD, autism -->
<!-- t.ex. skada, trötthet, stress -->
<!-- t.ex. ljus, buller, enhandsgrepp -->
<!-- Låg digital vana eller begränsad språkkunskap -->

---

# Hur många berörs?

1 av 6 globalt har funktionsnedsättning
~10 % dyslexi  
20 % beroende av a11y  
upp till 70 % påverkas  

<!-- 1 av 6 globalt har funktionsnedsättning endligt WHO -->
<!-- Runt 10 % har dyslexi eller liknande kognitiva svårigheter -->
<!-- Minst 20 % är direkt beroende av tillgänglighetsanpassningar – men upp till 50–70 % har nytta av den i praktiken. -->

---

# Reality check

- man inte kan logga in utan mus
- prisändringar inte annonseras
- knappar inte går att aktivera med Enter
- användaren hamnar "bakom" en modal

<!-- Detta är inte undantag – det är vanligt -->

---

# WCAG

## Version
- WCAG 2.0 (2008)
- WCAG 2.1 (2018)
- WCAG 2.2 (2023)

-Perceivable
-Operable
-Understandable
-Robust

<!-- Web Content Accessibility Guidelines -->
<!-- internationell standard som beskriver hur man gör webbplatser och appar tillgängliga för alla -->
<!--
Perceivable (Innehåll ska kunna uppfattas),
Operable (Det ska gå att använda tjänsten med tex tangenbord),
Understandable (Det ska vara lätt att förstå ,tydligt språk, förutsägbart beteende), Robust (Fungerar i olika tekniker och hjälpmedel, t.ex. kompatibel med skärmläsare)
-->
<!-- tar inte bort gamla, lägger till nya -->

## Nivå
- A – grundläggande krav
- AA – standardnivå
- AAA – avancerad nivå

<!-- det vi ska uppnå -->
<!-- sällan krav -->
<!-- Nivå AA innehåller A och AAA innehåller AA -->
<!--
A (grundkrav)
AA (standardnivå – lagkrav i EU/Sverige), vanligast
AAA (högsta nivå)
-->
<!-- De flesta försöker nå WCAG 2.1 AA vilket är den nivå dos/pts samt EEA går efter -->

---

# DOS

Lagen om tillgänglighet till digital offentlig service

- Myndigheter
- Kommuner och regioner
- Offentligt finansierade aktörer
- Vissa privata aktörer som utför offentlig tjänst

---

# EAA

European Accessibility Act

## EAA - privat sektor

### ex
- Banker
- E-handel
- Transport
- Digitala tjänster och produkter

### ex där det inte gäller
- Interna system
- Företag som inte erbjuder tjänster till konsumenter
- Vissa mycket små företag

<!-- t.ex. adminverktyg -->
<!-- B2B-only -->
<!-- undantag kan finnas -->
<!-- Började gälla brett: 28 juni 2025 men kontrollerna drog/drar igång på allvar under 2026 -->
<!-- EAA gäller inte alla företag – men generellt alla företag som erbjuder digitala tjänster till konsumenter påverkas i praktiken. Det blir i praktiken en hygienfaktor i hela marknaden. -->

---

# PTS

Post- och telestyrelsen

- Tillsynsmyndighet i Sverige
- Ansvarar för att DOS-lagen följs

<!--
stickprov och riktade granskningar.
Testar verkliga användarflöden
Inte bara automatiska verktyg
Fokuserar på:
navigation
formulär
interaktion.
Vad händer vid brister?
Den som tillhandahåller tjänsten måste:
åtgärdsplan
Kan leda till
uppföljning
krav
i vissa fall sanktioner/böter
PTS testar som användare – inte som utvecklare.
PTS började testa 2025 men i år har de skalat upp testning och kommer forsätta med det.
-->

<!-- Så vad går fel i praktiken? Här kommer några Ex -->

---

# Rubrikstruktur

- h1 = sidans huvudrubrik
- h2 = sektioner
- h3 = undersektioner

<!-- Som en innehållsförteckning -->

---

# Alt-texter

- ha en meningsfull alt-text
- eller vara dekorativa
- Dekorativa bilder ska inte läsas upp
- aria-hidden används för att dölja innehåll helt

<!-- Alla bilder ska ha ett alt-attribut
dekorativa bilder får alt="",
informativa och funktionella bilder ska ha en kort text som beskriver innehåll eller syfte. -->

---

# Fokusordning / fokus försvinner

<!--
Fokus hoppar fel
Fokus försvinner helt
Fokus följer inte det visuella flödet
t.ex. Användaren klickar på en länk, Ny sida laddas (client-side), Problem: Fokus ligger kvar på gamla länken,
modal-ex
-->

---

# Tangentbord fungerar inte

<!--
Du kan inte använda sidan med Tab, Piltangenter, Enter, Space
Interaktion kräver mus
"Knappar" som inte går att klicka med Enter. Enter gör inget, Space gör inget
-->

---

# Semantik / fel element

- Tex knappar Swedbank
- Name, Role, Value
- t.ex. <div onclick="submit()">Skicka</div>

<!-- t.ex. "Sök" -->
<!-- t.ex. button -->
<!-- checked/expanded/selected -->
<!-- alla interaktiva element ska ha name och role – state när det behövs -->

---

# Dynamiskt innehåll annonseras inte

![Swedbank](./source/swedb.png)

---

# Formulärproblem

- Användaren kan inte förstå vad som ska fyllas i
- Eller får inte veta vad som är fel
![Arbetsförmedlingen](./source/af.png)
<!-- tex labels kopplas till input el viktig information försvinner vid placeholders -->


---

# Modaler
[Exempel](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog)

---

# Kontrastproblem

- Text eller UI syns inte tillräckligt tydligt mot bakgrunden

<!-- Om det inte syns – så finns det inte. -->
<!-- går att mäta med massa olika verktyg -->

---

# Länkar/knappar saknar tydlig betydelse

- <a href="/article">Läs mer</a>
- <button> 🔍 </button>

<!-- man måste kunna se för att förstå vad den refererar till -->
<!-- ingen label -->
<!-- Om länken/knappen inte förklarar sig själv – så fungerar den inte -->

---

# Verktyg & test

- Automatiska verktyg inte räcker
- Lighthouse
- Wave
- Nvda
- Jaws
- VoiceOver

- Manuella tester
  - Tabba igenom sidan
  - Använd bara tangentbord
  - Testa formulär
  - Öka Storek på text och element
  - Använd tjänsten med endast skärmläsare

<!-- Bra start – men långt ifrån tillräckligt, De hittar kanske en tredjedel av problemen -->
<!-- tips: talet går att stänga av, gratis och räcker långt -->
<!-- vanligare hos användare i Sverige -->
<!-- Apple -->
<!-- viktigt -->
<!-- Det som inte läses upp – finns inte -->
<!-- Stäng av musen, Detta hittar de flesta riktiga problem -->

---

# Hur jobbar man med tillgänglighet?

## I utveckling
- Använd native HTML
- Säkerställ tangentbordstöd
- Hantera fokus korrekt
- Använd semantik

<!-- button, input, label -->
<!-- name, role, state -->
<!-- Bygg inte custom om du inte måste, berätta om Acorn. Bygger du rätt från början slipper du fixa i efterhand och sparar massa tid -->

---

## I design
- Säkerställ tillräcklig kontrast
- Tydliga interaktioner
- Information ska inte bara ges visuellt
- Tänk på struktur och rubriker

<!-- hover, fokus -->
<!-- Det här är inte bara ett dev-problem, UX påverkar kanske 50 % av a11y, Dålig design går inte att koda bort -->

---

## I test
- Testa med tangentbord
- Testa formulär
- Använd screen reader
- Kombinera auto + manuella tester

<!-- utan mus -->
<!-- Automatiska tester räcker inte, Testa som en användare -->

<!-- Definition of Done inkluderar a11y, UX, Dev och testare måste kunna a11y. Korrekt semantik underlättar mycket för a11y. Tillgänglighet är inget man lägger på i slutet – det måste byggas in från början. -->

---

# Frågor och kommentarer