# DT210G Fördjupad frontend-utveckling - Moment 2

## Att göra-lista
Detta repository innehåller källkoden för en React-applikation som är byggd med TypeScript. Webbplatsen listar alla saker som har lagts till i Att göra-listan och användare kan lägga till nya uppgifter, ta bort eller uppdatera status på befintliga uppgifter. Applikationen har skapats som en del av kursen DT210G, Fördjupad frontend-utveckling. 

## Funktionalitet
* Hämta och visa befintliga uppgifter
* Lägga till nya uppgifter
* Uppdatera status på en uppgift
* Ta bort en uppgift
* Validering av formuläret: titel måste vara minst 3 tecken och beskrivning får vara max 200 tecken
* Meddelanden vid felaktigt ifyllt formulär, inladdning av API samt vid borttagning av uppgift
* Responsiv design för både små och stora skärmar

## Backend
Projektet är byggt med Hapi.js som ansluter till en MongoDB-databas och använder Mongoose-schema för lagring av data. API:et har full CRUD-funktionalitet med stöd för att:
* Hämta alla uppgifter
* Lägga till en ny uppgift
* Uppdatera en uppgift
* Ta bort en uppgift 

## Skapad:
**Av:** Ronja Norlén  
**Kurs:** Fördjupad frontend-utveckling  
**Program:** Webbutveckling  
**Skola:** Mittuniversitetet 