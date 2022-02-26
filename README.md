# be-channeling [WIP]

*be-channeling* is a web component / decorator / behavior / custom attribute. 

It serves a similar purpose, and shares similar [syntax](https://github.com/bahrus/be-noticed/blob/baseline/types.d.ts) to [be-noticed](https://github.com/bahrus/be-noticed).

The difference between then is this: *be-noticed*, unlike this component, is meant to be attached to individual elements, focusing on scenarios where there is no ambiguity about the origin of the event.

*be-channeling*, in contrast, is meant to be attached to elements that host lots of rapidly changing children.

The most clear-cut case for *be-channeling* is attaching it to a web component that sponsors a (virtual) list.  There are many rotating elements inside, so it would be somewhat costly to attach event handlers on all of them.

Instead, be-channeling works with bubbling events, composed events, and captured events, and allows us to specify what actions to take by first filtering on the event based on css matching and other criteria.

```html
<xtal-vlist be-channeling='{
            "eventFilter": "click",
            "composedPathMatch": "button",
            "fn": "myHostMethod"
        }
}'>
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
2.  The eventFilter and composedPathMatch can each be objects, and allows for more complex event filtering.

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


## TODO's

- [x] First example above is supported.
- [ ] Specify to stop propagation of event.
- [ ] Specify to dispatch another event with a different name.
- [ ] Allow filtering of eventFilter, based on matching the keys.

## No, not JSON!

The [json-in-html](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) VSCode plugin allows us to benefit from syntax color highlighting, and consequently avoid most syntax misfires, including while editing README files.  It is compatible with the web versions of VSCode.

In addition, the [may-it-be](https://github.com/bahrus/may-it-be) transpiler allows us to edit .mts/.mjs files, and it compiles the files to static HTML files, which is another way to escape the purgatory that is raw JSON editing.  Using this technique, we can benefit from type checks on our attributes with no additional IDE plugins, and avoid all the non-ergonomic typing of quotes, and escaping.



