# lit-html

## Introduction

### What is lit-html

lit-html is a simple, modern, safe, small and fast HTML templating library for JavaScript.

lit-html lets you write HTML templates in JavaScript using template literals with embedded JavaScript expressions. Behind the scenes lit-html creates HTML `<template>` elements from your JavaScript templates and processes them so that it knows exactly where to insert and update the values from expressions.

### lit-html Templates

lit-html templates are tagged template literals - they look like JavaScript strings but are enclosed in backticks (`) instead of quotes - and tagged with lit-html’s html tag:

```javascript
html`<h1>Hello ${name}</h1>`
```

Since lit-html templates almost always need to merge in data from JavaScript values, and be able to update DOM when that data changes, they’ll most often be written within functions that take some data and return a lit-html template, so that the function can be called multiple times:

```javascript
let myTemplate = (data) => html`
  <h1>${data.title}</h1>
  <p>${data.body}</p>`;
```

lit-html is lazily rendered. Calling this function will evaluate the template literal using lit-html html tag, and return a TemplateResult - a record of the template to render and data to render it with. TemplateResults are very cheap to produce and no real work actually happens until they are rendered to the DOM.

### Rendering

To render a TemplateResult, call the render() function with a result and DOM container to render to:

```javascript
const result = myTemplate({title: 'Hello', body: 'lit-html is cool'});
render(result, document.body);
```

## Writing Templates

### Render static html

The simplest thing to do in lit-html is to render some static HTML.

```javascript
import {html, render} from 'lit-html';

// Declare a template
const myTemplate = html`<div>Hello World</div>`;

// Render the template
render(myTemplate, document.body);
````

The lit-html template is a tagged template literal. The template itself looks like a regular JavaScript string, but enclosed in backticks (`) instead of quotes. The browser passes the string to lit-html’s html tag function.

The html tag function returns a TemplateResult—a lightweight object that represents the template to be rendered.

The render function actually creates DOM nodes and appends them to a DOM tree. In this case, the rendered DOM replaces the contents of the document’s body tag.

### Render dynamic text
