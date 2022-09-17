# be-channeling

[![Playwright Tests](https://github.com/bahrus/be-channeling/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-channeling/actions/workflows/CI.yml)

Size of package, including custom element behavior framework (be-decorated):

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-channeling?style=for-the-badge)](https://bundlephobia.com/result?p=be-channeling)

Size of new code in this package:

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-channeling?compression=gzip">

<a href="https://nodei.co/npm/be-channeling/"><img src="https://nodei.co/npm/be-channeling.png"></a>

*be-channeling* is a web component / decorator / behavior / custom attribute.  It responds to internal events of the component it adorns. 

It serves a similar purpose, and shares similar [syntax](https://github.com/bahrus/be-noticed/blob/baseline/types.d.ts) to [be-noticed](https://github.com/bahrus/be-noticed).

The difference between them is this: *be-noticed*, unlike be-channeling, is meant to be attached to individual elements, focusing on scenarios where there is no ambiguity about the origin of the event.

*be-channeling*, in contrast, is meant to be attached to elements that host lots of rapidly changing children.

The most clear-cut case for *be-channeling* is attaching it to a web component that sponsors a (virtual) list.  There are many rotating elements inside, so it would be somewhat costly to attach event handlers on all of them.

Instead, be-channeling works with bubbling events, composed events, and captured events, and allows us to specify what actions to take by first filtering on the event based on css matching and other criteria.

```html
<xtal-vlist be-channeling='{
            "eventFilter": "click",
            "composedPathMatch": "button",
            "fn": "myHostMethod"
        }'
>
    <template slot=row>
        <button>Click me</button>
    </template>
</xtal-vlist>
```

... means "If the triggering element is a button, then call myHostMethod from the host".

> Isn't this a violation of encapsulation, to be monitoring for events that are coming from inside the (Shadow DOM) children of an element?

Not really.  As we can see in this example, the button element is part of the light children used to define the template that xtal-vlist uses.

The example above is basically the simplest example, but the syntax can scale to much larger scenarios:

1.  If more than one event type to monitor for, use an array.
2.  The eventFilter can be an object, and allows for more complex event filtering.

For example:

```html
<xtal-vlist be-channeling='{
            "eventFilter": {
                "type": "click",
                "key": "enter",
                "shiftKey": true,
                "details":{
                    "value": "true"
                },
            },
            "composedPathMatch": "button",
            "fn": "myHostMethod"
        }
}'>
    <template slot=row>
        <button>Click me</button>
    </template>
</xtal-vlist>
```


## No, not JSON!

The [json-in-html](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) VSCode plugin allows us to benefit from syntax color highlighting, and consequently avoid most syntax misfires, including while editing README files.  It is compatible with the web versions of VSCode.

In addition, the [may-it-be](https://github.com/bahrus/may-it-be) transpiler allows us to edit .mts/.mjs files, and it compiles the files to static HTML files, which is another way to escape the purgatory that is raw JSON editing.  Using this technique, we can benefit from type checks on our attributes with no additional IDE plugins, and avoid all the non-ergonomic typing of quotes, and escaping.



## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-channeling/be-channeling.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-channeling';
</script>
```