# REST API Documentatie
## Endpoints

De API heeft de volgende eindpunten:

| Endpoint                                      | `GET`        | `POST`     | `PATCH`                 | `DELETE`           |
|---|---|---|---|---|
| */*                                           | OK           | -          | -                       | -                  |
| *[/lid](#lid)*                                | -            | Not found  | -                       | -                  |
| *[/lid/{lidid}](#lidlidid)*                   | OK¹          | -          | Unsupported Media Type  | -                  |
| *[/lid/profiel](#lidprofiel)*                 | OK¹          | -          | Method not allowed      | -                  |
| *[/groep](#groep)*                            | OK²          | -          | -                       | -                  |
| *[/groep/{groepsnummer}](#groepgroepsnummer)* | OK²          | -          | Method not allowed      | -                  |
| *[/functie](#functie)*                        | OK³          | Not found  | -                       | -                  |
| *[/functie?{query-string}](#functiefunctieid)*| Not found    | -          | -                       | -                  |
| *[/functie/{functieid}](#functiefunctieid)*   | OK           | -          | Method not allowed      | Method not allowed |
| *[/filter](#filter)*                          | Not found    | Not found  | -                       | -                  |
| *[/filter/kolommen](#filterkolommen)*         | Not found    | -          | -                       | -                  |
| *[/filter/{filterid}](#filterfilterid)*       | Not found    | -          | Not found               | Not found          |
| *[/ledenlijst](#ledenlijst)*                  | Not found    | -          | -                       | -                  |

 ¹ Geen verbondsgegevens/”lidkaartafgedrukt”, adres/“giscode” en adres/“omschrijving”
   Functies gaan in de toekomst niet meer per groep geordend worden
   
 ² Geen “website”, “publieke-info”, “email”, opgericht", "beeindigd”, "publiek-inschrijven”, “rekeningnummer” en adres/“positie”
 
 ³ Imperformante request

## Algemeen

### ETag

De implementatie zal [ETag's](http://en.wikipedia.org/wiki/HTTP_ETag) voorzien. Een gebruiker kan hiermee kijken of een resource gewijzigd is.
Voor de `GET` betekent dit dat als de resource niet gewijzigd is de gebruiker een *304* terug zal krijgen. (Browsers zullen dit transparant voor de gebruiker doen.)
Nuttiger is dat bij een `PATCH` of `DELETE` de gebruiker op deze manier een vorm van optimistic locking kan implementeren. (Wijzig deze resource enkel als hij door niemand anders gewijzigd is.

### Headers

De volgende headers moeten opgestuurd worden naar de server:

|   |   |
|---|---|
| *Accept* 			| `application/json`                              |
| *Authentication* 	| oauth-2.0 access token: `Bearer {accessToken}`  |



## Eindpunten

### */lid*

#### `GET`

##### Response
```javascript
{
  links: [{
    "href": "https://ga.sgv.be/rest/lid",
    "method": "POST",
    "rel": "create"
  },{
    "href": "https://ga.sgv.be/rest/lid/profiel",
    "rel": "profiel"
  }]
}
```

#### `POST`
Maak een nieuw lid aan.

##### Request
In te vullen secties: `persoonsgegevens`, `adressen`, `email` en `functies`  
Optioneel: `groepseigen` en `contacten`

##### Response
Het lid zoals in `GET` lid


### */lid/{lidid}*

Een specifiek lid

#### `GET`

##### Request

##### Response
```javascript
{
  "id": "d5f75b320b812440010b8127f95f4db4",
  "aangepast": "2014-04-30T13:16:34+00:00",
  "persoonsgegevens" : {
    "voornaam": "Baden",
    "achternaam": "Powell",
    "geslacht": "m",
    "GSM": "0123/456.789",
    "geboortedatum": "1857-02-22",
    "beperking": false,
    "verminderdlidgeld": false,
    "rekeningnummer": "BE68 5390 0754 7034",
  },
  "verbondsgegevens": {
    "lidnummer": "1857012301234",
    "klantnummer": "I127872",
    "lidgeldbetaald": true,
    "lidkaartafgedrukt": true
  },
  "gebruikersnaam": "lukasvo",
  "adressen": [
    {
      "id": "d5f75e23385c5e6e0139493b84fe0352",
      "land": "BE",
      "postcode": "9000",
      "gemeente": "Gent",
      "straat": "Zondernaamstraat",
      "giscode": "0160",
      "nummer": "1",
      "bus": "",
      "telefoon": "012345678",
      "postadres": true,
      "omschrijving" : "adres papa",
      "status": "NORMAAL",
    }
  ],
  "contacten": [
    {
      "id": "d5f75e23385c5e6e0139493b84fe0abc",
      "voornaam": "Henrietta",
      "achternaam": "Smyth",
      "rol": "Moeder",
      "adresId": "d5f75e23385c5e6e0139493b84fe0352",
      "gsm" : "0499 12 34 56",
      "email": null
    }
  ],
  "email": "b.powell@example.com",
  "functies": {
    "A3143G": [
      {
        "groep": "A3143G",
        "functie": "d5f75e23385c5e6e0139493b8546035e",
        "begin": "2014-01-01",
        "einde": "2014-03-02" 
        "links": [{
          "href": "http://ga.sgv.be/rest/groep/A3143G",
          "rel": "groep",
          "method": "GET"
        },{
          "href": "http://ga.sgv.be/rest/functie/d5f75e23385c5e6e0139493b8546035e",
          "rel": "functie",
          "method": "GET"
        }]
      }
    ]
  },
  "groepseigen": [
    {
      "groep": "A3143G",
      "gegevens": [
        {
          "id": "d5f75e233f7d1ccc013f9e3c6a0909f7",
          "naam": "Gaat mee op Weekend",
          "type": "vinkje",
          "waarde": true,
          "schrijfbaar": true,
        },
        {
          "id": "dd5f75e233f7d1ccc013f9e3c6a0909f7",
          "naam": "E-mail ouder",
          "type": "email",
          "waarde": "",
          "schrijfbaar": true,
        },
        {
          "id": "d5f75e233f7d1ccc013f9e3c6a0909f7",
          "naam": "lievelingskleur",
          "type": "lijst",
          "keuze": ["groen", "rood", "blauw"],
          "schrijfbaar": false,
        },
      ],      
      "links": [{
        "href": "http://ga.sgv.be/rest/groep/A3143G",
        "rel": "groep",
        "method": "GET"
      }]
    }
  ],
  "links": [
    {
      "rel": "self",
      "href": "https://ga.sgv.be/rest/lid/d5f75b320b812440010b8127f95f4db4",
      "method": "GET"
    },{
      "rel": "update",
      "href": "https://ga.sgv.be/rest/lid/d5f75b320b812440010b8127f95f4db4",
      "method": "PATCH",
      "secties": ["persoonsgegevens", "adressen", "email", "functies.A3143G", "groepseigen"]
    }, { //Indien lid vanuit filter opgeroepen werd en er dus een vorig en volgend lid mogelijk is
      "rel": "prev",
      "href": "https://ga.sgv.be/rest/lid/d5f75b320b812440010b8127f95f4db4?pos=acme",
      "method": "GET"
    }, {//Indien lid vanuit filter opgeroepen werd en er dus een vorig en volgend lid mogelijk is
      "rel": "next",
      "href": "https://ga.sgv.be/rest/lid/d5f75b320b812440010b8127f95f4db4?pos=bar",
      "method": "GET"
    }
  ]
}
```

* Bij samengevoegde leden zullen beide lid-id's blijven werken, en naar dezelfde resource leiden (waarschijnlijk redirect).
* Een andere mogelijkheid is om elke sectie van deze resource te splitsen in kleinere secties.  (*lid/{lidid}/persoonsgegevens*).  Dit is makkelijker op de server kant, maar heb het gevoel dat op de client zijde dit dingen vermoeilijkt (of niet?).

#### PATCH
Updaten van een lid

##### Request
* In het request kan de gebruiker alle secties opladen waar hij toegang voor heeft.  Deze zijn opgesomd onderaan in de links sectie.
* Weggelaten secties worden als niet aangepast beschouwd.
* Het opladen van een niet voor deze gebruiker niet schrijfbare sectie resulteert in een foutmelding van de server.

Een beschrijving per sectie wat kan en mag:

###### persoonsgegevens
* Alle velden zijn verplicht datum enkel in ISO8601 formaat.

###### adressen
* Adressen worden gecorreleerd aan de hand van de id.
* Een id niet opladen is een adres verwijderen.
* Een adres zonder id toevoegen is een nieuw adres.
* Belgische adressen moeten een gis code hebben. (Hoe giscode ophalen???)
* De status kan niet ingesteld worden.

###### email
* Is soms wijzigbaar en soms niet, goed kijken naar de secties in de links topic.

###### functie-instanties
Een functie-instantie heeft geen `id` veld.  Het wordt uniek gekenmerkt door de combinatie van de velden `functie`, `groep` en `begin`.

* Functie-instantie toevoegen == een functie-instatie toevoegen met `begin` != `null` of `false`.  Deze zal door de server worden ingevuld op de huidige timestamp.
* Functie-instantie stopzetten == een bestaande niet beeindigde functie-instantie opladen met `einde` != `null` of `false`.  Je mag dus datum invullen, maar de server zal hier geen rekening mee houden.
* Er word dus enkel naar de combinatie van `functie`, `groep` en `begin` gekeken.  Alle andere velden worden genegeerd.  Je bent dus niet verplicht om telkens alle functies terug te sturen naar de server als je er een enkele wil aanpassen.

###### groepseigen
* Groepseigen velden worden gecorreleerd aan de hand van een id.
* Er wordt enkel gekeken naar het `id` veld en het `waarde` veld.  Alle andere velden worden genegeerd.
* Een niet schrijfbaar dat toch opgeladen wordt, wordt genegeerd.
* Als een gegeven niet opgeladen wordt wordt het als onveranderd beschouwd.

##### Response
Een redirect naar het nieuwe lid of error


### */lid/profiel*

#### `GET`

Verwijst naar *lid/{lidid van ingelogd lid}*


### */groep*

#### `GET`

##### Response
Alle groepen waar je toegang toe hebt:
```javascript
{
  "groepen": [{
    "groepsnummer": "A3143G",
    "naam": "Sint-benedictus",
    "links":[{
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "self"
    },{
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "update",
      "method": "PATCH",
    }]
  }],
  "links":[{
    "href": "https://ga.sgv.be/rest/groep",
    "rel": "self"
  }]
}
```

### */groep/{groepsnummer}*

#### `GET`

##### Response
```javascript
{
  "id": "d5f75b320b812440010b812550aa028e",
  "groepsnummer":"A3143G",
  "naam": "Sint Benedictus",
  "adres": {
    "land": "BE",
    "postcode": "2640",
    "gemeente": "Mortsel",
    "straat": "Jacob van Arteveldestraat",
    "giscode": "0160",
    "nummer": "27",
    "bus": "",
    "positie": {
      "lat" : 51.166969,
      "lng" : 4.462271
    }
  },
  "website":"http://www.sgv.be",
  "publieke-info":"Info die we op onze website mogen zetten",
  "email":"info@sgv.be",
  "opgericht":"1900/01/01",
  "beeindigd":"2014/09/01",//optioneel - enkel voor gestopte groepen
  "publiek-inschrijven": true,
  "rekeningnummer":"BE68 5390 0754 7034",
  "links":[
    {
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "self"
    },{
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "update",
      "method": "PATCH",
    },{
      "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/lidworden?groep=A3143G",
      "rel": "inschrijven",
      "method": "GET"
    },{
      "href": "https://ga.sgv.be/rest/groep/A3143G/inschrijvingen",
      "rel": "inschrijvingen",
      "method": "GET"
    },{
      "href": "https://ga.sgv.be/rest/groep/A3143G/groepseigen-gegevens",
      "rel": "groepseigen-gegevens",
      "method": "GET"
    },{
      "href": "https://ga.sgv.be/rest/functie?groep=A3143G",
      "rel": "groepseigen-functies",
      "method": "GET"
    },{
      "href": "https://ga.sgv.be/rest/functie",
      "rel": "groepseigen-functies-aanmaken",
      "method": "POST"
    },{
      "href": "https://ga.sgv.be/rest/groep/A3143G/statistieken",
      "rel": "statistieken",
      "method": "GET"
    }
  ],
  "aangepast": "2015-06-04T08:34:41.823Z"
}
```

#### `PATCH`

##### Request
Zelfde als `GET` response, maar `links`, `naam` en `nummer` worden genegeerd.

##### Response
`GET` response.

### */functie*

#### `GET`

Opgelet: imperformante request!

##### Response
Alle functies waar je recht op hebt:
- functies die vasthangen aan groepsoorten waar je recht op hebt
- groepseigen functies van groepen waar je recht op hebt

#### `POST`

##### Request
Je maak een nieuwe groepseigen functie aan. Enkel de velden `beschrijving` en `voor` zijn verplicht. We laten (op dit moment) geen meerdere groepen in het `voor` veld door.

##### Response
Een redirect naar de nieuwe functie of een error.

### */functie/{functieId}*

#### `GET`

"type": "verbond" of "groep"

##### Response
Een verbondsfunctie. Specifieke properties: "code" en "adjunct"

"groepen": lijst van groepen a) waarbij deze functie kan voorkomen en b) waar de ingelogde gebruiker toegang toe heeft

```javascript
{
  "id": "d5f75e23385c5e6e0139493b8546035e",
  "code": "KWL",
  "beschrijving": "Kabouter welpen leider",
  "type":"verbond",
  "groepen":["A3143G", "A3160M"],
  "adjunct":"e0139493b8546035ed5f75e23385c5e6"
  "links":[
    {    
      "href": "https://ga.sgv.be/rest/functie/d5f75e23385c5e6e0139493b8546035e",
      "rel": "self",
      "method": "GET"
    }, {    
      "href": "https://ga.sgv.be/rest/functie/e0139493b8546035ed5f75e23385c5e6", //link naar AKWL
      "rel": "adjunct",
      "method": "GET"
    }
  ],
  "aangepast": "2015-06-04T08:34:41.823Z"
}
```

Groepseigen functie:

"groepen": groep waartoe deze functie behoort

```javascript
{
  "id": "d5f75e23385c5e6e0139493b8546035e",
  "beschrijving": "Barploeg",
  "type":"groep",
  "groepen":["A3143G"],
  "links":[
    {    
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "self",
      "method": "GET"
    }, {    
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "update",
      "method": "PATCH"
    }, {    
      "href": "https://ga.sgv.be/rest/groep/A3143G",
      "rel": "delete",
      "method": "DELETE"
    },
  ],
  "aangepast": "2015-06-04T08:34:41.823Z"
}
```

#### `PATCH`
##### Request
Update van het `beschrijving` veld. Alle andere velden worden genegeerd.

##### Response
De upgedate functie of een error.

#### `DELETE`

##### Request
Geen body nodig.

##### Response
Een error met een bevestigingslink.


### `/filter/{filterid}`
#### `GET`

##### Request
Vraag een specifieke filter op met een id.

De speciale `filterid` `huidige` wordt gebruikt om de filter gebruikt door de ledenlijst aan te duiden.

De `huidige` filter moet niet perse een opgeslagen filter zijn.

##### Response
```javascript
{
  "id": "d5f75e23385c5e6e0139493b8546035e",  //Niet aanwezig voor `huidige` filter als niet opgeslagen
  "naam": "Mijn filter", //Niet aanwezig voor `huidige` filter als niet opgeslagen
  "type":"verbond",  // Niet aanwezig voor `huidige` als niet opgeslagen.  Mogelijkheden ['verbond', 'groep', 'lid']
  "groep": "A3143G", // Enkel aanwezig indien type groep
  "kolommen": [
    {
       "type" : "vinkje", // Zie dynamische velden
       "id" : "c81e728d9d4c2f636f067f89cc14862c", // leesbare id voor verbondsvelden
       "label": "tekst veld",
       "beschrijving": "voor hover",
       "van": "groep"
    }, {
       "type" : "tekst", // Zie dynamische velden
       "id" : "persoonsgegevens.voornaam", //pad naar veld in lid json structuur (zie foutmeldingen)
       "label": "Voornaam",
       "beschrijving": "voor hover",
       "van": "verbond"
    }
  ],
  "filter": { // per filtertype een attribuut, mag afwezig zijn als niet belangrijk
    "functies": ["d5f75e23385c5e6e0139493b8546035e"], // Lijst van functieid's
    "leeftijd": {
      "ouderdan": 16, //optioneel
      "jongerdan": 13, //optioneel
      "op31december": true //optioneel false by default
    },
    "geslacht": "jongen", //<> meisje
    "groepen": ["A3143G"],
    "groepseigen": [
      {
        "veld": "c81e728d9d4c2f636f067f89cc14862c", //veld-id
        "waarde": "ok",
        "patroon": true // LIKE pattern optioneel false by default % en _ voor matching
      }
    ]
  },
  "sortering": [  // Moet in aanwezig zijn in de kolommen
    {
      "kolom": "c81e728d9d4c2f636f067f89cc14862c",
      "oplopend": true
    }
  ],
  "links":[
    {    
      "href": "https://ga.sgv.be/rest/filter/d5f75e23385c5e6e0139493b8546035e",  //Niet aanwezig voor `huidige` filter als niet opgeslagen
      "rel": "self",
      "method": "GET"
    }, {
      "rel": "update", //Enkel aanwezig als je dit type filter mag wijzigen
      "href": "https://ga.sgv.be/rest/filter/d5f75b320b812440010b8127f95f4db4",
      "method": "PATCH",
      "secties": ["id" /*Enkel bij `huidige`*/, "naam", "groep" /*als type == "groep"*/, "kolommen", "filter", "sortering"]  //"naam" niet zichtbaar voor "huidige"
    }
  ],
  "aangepast": "2015-06-04T08:34:41.823Z"
}
```

#### `PATCH`
Werkt zoals andere `PATCH`es

##### Request
de te `PATCH`en secties

##### Response
zoals `GET` indien succesvol

#### `DELETE`
Om een filter te deleten, `huidige` mag niet ge-deleted worden.

##### Request
Geen body nodig.

##### Response
HTTP 204 zonder body indien toegelaten.


### `/filter`
#### `GET`

##### Request
Geen body nodig.

##### Response
```javascript
{
  "filters": [ //Enkel opgeslage filters, huidige niet dus.
    {
      "id": "d5f75e23385c5e6e0139493b8546035e",  //Niet aanwezig voor `huidige` filter als niet opgeslagen
      "naam": "Mijn filter", //Niet aanwezig voor `huidige` filter als niet opgeslagen
      "type":"verbond",  // Niet aanwezig voor `huidige` als niet opgeslagen.  Mogelijkheden ['verbond', 'groep', 'lid']
      "groep": "A3143G", // Enkel aanwezig indien type groep
      "links":[
        {    
          "href": "https://ga.sgv.be/rest/filter/d5f75e23385c5e6e0139493b8546035e",  //Niet aanwezig voor `huidige` filter als niet opgeslagen
          "rel": "self",
          "method": "GET"
        }, {
          "rel": "update", //Enkel aanwezig als je dit type filter mag wijzigen
          "href": "https://ga.sgv.be/rest/filter/d5f75b320b812440010b8127f95f4db4",
          "method": "PATCH",
          "secties": ["id", "naam", "groep" /*als type == "groep"*/, "kolommen", "filter", "sortering"]  //"naam" niet zichtbaar voor "huidige"
        }
      ]
    }
  ],
  "links":[
    {    
      "href": "https://ga.sgv.be/rest/filter",
      "rel": "self",
      "method": "GET"
    }, {
      "rel": "create",
      "href": "https://ga.sgv.be/rest/filter",
      "method": "POST",
    }, {    
      "href": "https://ga.sgv.be/rest/filter/huidige",
      "rel": "current",
      "method": "GET"
    }, 
  ]
}
```

#### `POST`
##### Request
Alle secties behalve `links` en `id`

##### Response
Redirect naar nieuwe filter.

### `/filter/kolommen`
#### `GET`
//Een lijst met alle toegelaten kolommen van een filter.

### `/ledenlijst`
#### `GET`
##### Request
2 optionele uri parameters toegelaten:
* `offset`: bij het hoeveelste lid de ledenlijst moet starten
* `aantal`: maximum aantal leden server mag teruggeven.  (de server mag minder teruggeven)

##### Response
Redirect naar nieuwe filter.
```javascript
{
  "aantal": 20, // Aantal leden in huidige response
  "totaal": 1231, //Aantal leden in ledenlijst
  "leden": [
    {
      "id": "d5f75b320b812440010b8127f95f4db4",
      "waarden": ["Baden", true], //voor volgorde zie filter
      "links":[
        {    
          "href": "https://ga.sgv.be/lid/d5f75b320b812440010b8127f95f4db4?positie=foo", //Merk op extra paramter, de server kan ervoor kiezen om hier een extra parameter mee te geven, om zo prev en next correct te berekenen als lid meerdere keren in de lijst zit.
          "rel": "self",
          "method": "GET"
        },
      ]
    }
  ]
  "links":[
    {    
      "href": "https://ga.sgv.be/rest/ledenlijst?offset=0",
      "rel": "self",
      "method": "GET"
    }, {
      "rel": "next",
      "method": "GET",
      "href": "https://ga.sgv.be/rest/ledenlijst?offset=20",
    }, {    
      "href": "https://ga.sgv.be/rest/filter/huidige",
      "rel": "filter",
      "method": "GET"
    }, 
  ]
}
```

## Errors

### Status codes
Zoals het hoort gebruiken we de volgende HTTP status codes:

|   |   |
|---|---|
| 200 | Request OK              |
| 201 | Resource created        |
| 304 | Not modified            |
| 400 | Bad request             |
| 401 | Unauthorized request    |
| 404 | Resource was not found  |
| 50x | Inernal server error    |

### Formaat
```javascript
{
  "id": "unieke_id_voor_deze_foutmelding",
  "titel": "{titel van het fout bericht}",
  "beschrijving": "{Gebruiksvriendelijke beschrijving van de fout}",
  "details": [ //Optioneel
    {
      "titel": "{titel van het fout bericht}",
      "beschrijving": "{Gebruiksvriendelijke beschrijving van de fout}",
      "veld": "sectie.veldnaam", //optioneel referentie naar het veld dat met de fout te maken heeft
    }, ...
  ],
  "links": [
    {
      "rel": "help",
      "href": "http://wiki.svg.be/..",
      "method": "GET",
    },
    {
      "rel": "force",
      "method": "POST",
      "href": "https://ga.svg.be/rest/lid/gaid/forceer?geboortedatum=2009-01-21"
    }
  ],
  "aangepast": "2015-06-04T08:34:41.823Z"
}
```


## Meer lezen

* [PayPal REST API](https://developer.paypal.com/webapps/developer/docs/api/) veel gespiekt hier
* [HATEOAS](http://timelessrepo.com/haters-gonna-hateoas)
* [HAL](http://blog.stateless.co/post/13296666138/json-linking-with-hal) (formele spec van een hateos manier)
* [json schema](http://json-schema.org/examples.html) (Beschrijving voor ongekende velden)
* [Jersey, jax-rs en etag caching](https://devcenter.heroku.com/articles/jax-rs-http-caching)
