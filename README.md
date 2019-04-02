---
description: template literals library
---

# lit-html

## Einleitung

### Was ist lit-html

lit-html ist eine einfache, moderne, sichere, kleine und schnelle HTML-Template-Bibliothek für JavaScript.

lit-html ermöglicht es Ihnen, HTML-Templates in JavaScript mit Template-Literalen mit eingebetteten JavaScript-Ausdrücken zu schreiben. Hinter den Kulissen erstellt lit-html HTML `<template>` Elemente aus Ihren JavaScript-Vorlagen und verarbeitet sie so, dass sie genau weiß, wo sie die Werte aus Ausdrücken einfügen und aktualisieren muss.

### lit-html Vorlagen

lit-html-Templates sind getagte Template-Literale - sie sehen aus wie JavaScript-Zeichenketten, sind aber in Backticks \(\`\) anstelle von Anführungszeichen eingeschlossen - und mit dem HTML-Tag von lit-html versehen:

```javascript
html`<h1>Hello ${name}</h1>`
```

Da lit-html-Templates fast immer Daten aus JavaScript-Werten zusammenführen und das DOM aktualisieren können, wenn sich diese Daten ändern, werden sie meist in Funktionen geschrieben, die einige Daten aufnehmen und eine lit-html-Template zurückgeben, so dass die Funktion mehrfach aufgerufen werden kann:

```javascript
let myTemplate = (data) => html`
  <h1>${data.title}</h1>
  <p>${data.body}</p>`;
```

lit-html wird faul gerendert. Der Aufruf dieser Funktion wertet das Template-Literal mit dem HTML-Tag lit-html aus und gibt ein TemplateResult zurück - einen Datensatz der zu rendernden Vorlage und Daten, mit denen sie dargestellt werden kann. TemplateResults sind sehr billig zu produzieren und es findet keine echte Arbeit statt, bis sie im DOM gerendert werden.

### Rendern

Um ein TemplateResultat zu rendern, rufen Sie die Funktion render\(\) mit einem Ergebnis und einem DOM-Container auf, in den Sie rendern möchten:

```javascript
const result = myTemplate({title: 'Hello', body: 'lit-html is cool'});
render(result, document.body);
```

## Vorlagen schreiben

### Rendern von statischem HTML

Die einfachste Sache, die man in lit-html tun kann, ist, etwas statisches HTML zu rendern.

```javascript
import {html, render} from 'lit-html';

// Deklaration der Vorlage
const myTemplate = html`<div>Hello World</div>`;

// Rendern der Vorlage
render(myTemplate, document.body);
```

Die lit-html-Vorlage ist ein getaggtes Vorlagenliteral. Die Vorlage selbst sieht aus wie eine normale JavaScript-Zeichenkette, ist aber in Backticks \(\`\) anstelle von Anführungszeichen eingeschlossen. Der Browser übergibt die Zeichenkette an die HTML-Tag-Funktion von lit-html.

Die HTML-Tag-Funktion gibt ein TemplateResultat zurück - ein leichtgewichtiges Objekt, das die zu rendernde Vorlage repräsentiert.

Die Renderfunktion erstellt tatsächlich DOM-Knoten und hängt sie an einen DOM-Baum an. In diesem Fall ersetzt das gerenderte DOM den Inhalt des Body-Tags des Dokuments.

### Rendern dynamischen Texts

Mit einer statischen Vorlage können Sie nicht sehr weit kommen. lit-html ermöglicht es Ihnen, Bindings mit `${expression}` Platzhaltern im Template-Literal zu erstellen:

```javascript
const aTemplate = html`<h1>${title}</h1>`;
```

Um Ihre Vorlage dynamisch zu machen, können Sie eine Vorlagenfunktion anlegen. Rufen Sie die Vorlagenfunktion jedes Mal auf, wenn sich Ihre Daten ändern.

```javascript
import {html, render} from 'lit-html';

// Definition einer Template-Funktion
const myTemplate = (name) => html`<div>Hello ${name}</div>`;

// Rendern der Vorlage mit einigen Daten
render(myTemplate('world'), document.body);

// ... später ... 
// Rendern der Vorlage mit anderen Daten
render(myTemplate('lit-html'), document.body);
```

Wenn Sie die Vorlagenfunktion aufrufen, erfasst lit-html die aktuellen Ausdruckswerte. Die Template-Funktion erstellt keine DOM-Knoten, daher ist sie schnell und kostengünstig.

Die Template-Funktion gibt ein TemplateResult zurück, das eine Funktion der Eingabedaten ist. Dies ist eines der Hauptprinzipien bei der Verwendung von lit-html: die Erstellung von UI als Funktion des Zustands.

Wenn Sie render aufrufen, aktualisiert lit-html nur die Teile der Vorlage, die sich seit dem letzten render geändert haben. Dies macht die Aktualisierung von lit-html sehr schnell.

### Ausdrücke benutzen

Das vorherige Beispiel zeigt die Interpolation eines einfachen Textwertes, aber die Bindung kann jede Art von JavaScript-Ausdruck beinhalten:

```javascript
const myTemplate = (subtotal, tax) => html`<div>Total: ${subtotal + tax}</div>`;
const myTemplate2 = (name) => html`<div>${formatName(name.given, name.family, name.title)}</div>`;
```

### Mit Attributen verbinden

Zusätzlich zur Verwendung von Ausdrücken im Textinhalt eines Knotens können Sie diese auch an die Attribut- und Eigenschaftswerte eines Knotens binden.

Standardmäßig erzeugt ein Ausdruck im Wert eines Attributs eine Attributbindung:

```javascript
// Setzen der Klassenattribute
const myTemplate = (data) => html`<div class=${data.cssClass}>Stylish text.</div>`;
```

Da Attributwerte immer Zeichenketten sind, sollte der Ausdruck einen Wert zurückgeben, der in eine Zeichenkette umgewandelt werden kann.

Verwenden Sie das Präfix `?` für eine boolesche Attributbindung. Das Attribut wird hinzugefügt, wenn der Ausdruck zu einem Wahrheitswert ausgewertet wird, entfernt, wenn er zu einem Falsy-Wert ausgewertet wird:

```javascript
const myTemplate2 = (data) => html`<div ?disabled=${!data.active}>Stylish text.</div>`;
```

### Mit Eigenschaften verbinden

Sie können sich auch über das Präfix . und den Eigenschaftsnamen an die JavaScript-Eigenschaften eines Knotens binden:

```javascript
const myTemplate3 = (data) => html`<my-list .listItems=${data.items}></my-list>`;
```

Mit Eigenschaftsbindungen können Sie komplexe Daten im Baum an Teilkomponenten übergeben.

Beachten Sie, dass der Eigenschaftsname in diesem Beispiel - listItems - gemischt ist. Obwohl HTML-Attribute nicht zwischen Groß- und Kleinschreibung unterscheiden, bewahrt lit-html den Fall, wenn es das Template verarbeitet.

### Event Listener hinzufügen

Vorlagen können auch deklarative Ereignishörer beinhalten. Ein Event Listener sieht aus wie eine Attributbindung, aber mit dem Präfix @ gefolgt von einem Eventnamen:

```javascript
const myTemplate = () => html`<button @click=${clickHandler}>Click Me!</button>`;
```

Dies entspricht dem Aufruf von `addEventListener('click', clickHandler)` auf dem Button-Element.

Der Event Listener kann entweder eine reine Funktion oder ein Objekt mit einer handleEvent-Methode sein:

```javascript
const clickHandler = {
  // handleEvent-Methode ist erforderlich
  handleEvent(e) { 
    console.log('clicked!');
  },
  // Event Listener Objekte können auch Null oder mehr des Events definieren.
  // Listener Optionen: capture, passive, und once.
  capture: true,
};
```

:point\_up: Achtung

> Objekte des Event-Hörers. Wenn Sie einen Listener über ein Event-Listener-Objekt angeben, wird das Listener-Objekt selbst als Event-Kontext \(dieser Wert\) festgelegt.

