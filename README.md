# be-channeling

be-channeling is a web component / decorator / behavior / custom attribute that serves a similar purpose, and shares similar [syntax](https://github.com/bahrus/be-noticed/blob/baseline/types.d.ts) to [be-noticed](https://github.com/bahrus/be-noticed).

The difference is be-noticed is meant to be attached to individual elements, focusing on scenarios where there is no ambiguity about the origin of the event.

be-channeling, in contrast, is meant to be attached to elements that host lots of rapidly changing children.

The most clear case for be-channeling is a host element that sponsors a virtual list.  There are many rotating elements inside, so it would somewhat costly to attach event handlers on all of them.

Instead, be-channeling works with bubbling events, composed events, and captured events, and allows us to specify what actions take by first filtering on the event based on css matching and other criteria.

```html
<xtal-vlist be-channeling='{
    "on": [
        {
            "type": "click",
            "ifPathHeadMatches": "button",
            "ifAllOf": ["dataset.active"],
            "ifNoneOf": ["disabled"],
            "fn": "myHostMethod"
        }
    ],

}'>
    ...
</xtal-vlist>
```