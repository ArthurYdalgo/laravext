# Router

The Laravext router follows the same pattern as [Next.js](https://nextjs.org/)' App Router. Each directory will be, in most cases, a url segment that might be a page. For a directory to be a page it must contain a `page.(jsx|tsx|vue|ts|js)` file. (These types are the default ones, but can be customized). [Other file conventions from Next.js also exist here](/concepts/file-conventions), and will be explained further ahead. Every time an automagically generated route is accessed, the application will load the default root view (which can be overwritten for a specific route, if necessary). This route view might extend a layout or not, depending on your needs, and must contain a `@nexus` [blade directive](/tools/blade-directives). The `createLaravextApp` will then look for every nexus in the DOM (although it'd usually only make sense to have one), and render the page component of that URL path.

## Parameters

In a nexus route you might have two types of parameters: `query_params` and `route_params`. Query parameters are the usual ones, such as `domain.com/dashboard?foo=bar&baz=qux`. Additionally, you can create route parameters using the same naming convention from Laravel:

```
+ resources/js/nexus
+ dashboard
  + orders
    + {order}
      - page.jsx
```

When accessing `domain.com/dashboard/orders/12345`, you'd receive a route parameter `"order": "12345"` in your component, which is accessible through the [laravext prop](/concepts/laravext-prop).

## Route Groups

Sometimes you might want to apply a layout, middleware, etc to children directories. You can do this by creating route groups. Simply name a directory with surrounding parenthesis. The conventions will cascade down to children directories, and will only be overwriten if a child directory has its own conventions, but will still be aplied to other children directories. If there's another route group that defines one or multiple previously existing convention(s) that is/are cascading down, this/these new conventions will be cascaded down from that point on. If a previously cascading convention is not set by a children route group, it will continue to cascade down until another one is set by group down the line (if it happens). 

That might have been a really confusing paragraph (I got confused while writing it myself), so here's an example of a rather unoriginal and possibly unrealistic scenario of a virtual library application for writers and readers:

```bash
+ resources/js/nexus
  - page.jsx # your-domain.com/

  + (guest)
    - middleware.jsx # 1 (will cascade down)
    - layout.jsx # 2 (will cascade down)
    + login
      - page.jsx # /login
    + register
      - page.jsx # /register
  
  + (auth)
    - middleware.jsx # 3 (will cascade down)
    - layout.jsx # 4 (will cascade down)
    + (author)
      - middleware.jsx # 5 (overwrites middleware #3 from now on)
      - layout.jsx # 6 (overwrites layout #4 from now on)
      + (writer)
        + books
          - layout.jsx # 7 (is only used in this route)
          - page.jsx # /books
          + create
            - page.jsx # /books/create
          + (books)
            - layout.jsx # 8 (overwrites layout #6 from now on)
            + {book}
              - page.jsx # /books/{book}
              + edit
                - page.jsx # /books/{book}/edit
              + preview
                - page.jsx # /books/{book}/preview
                - layout.jsx # 9 (is only used in this route)

    + (reader)
      + catalog
        - page.jsx # /catalog

```

So, based on this:
- /login uses:
  - middleware #1
  - layout #2
- /register uses:
  - middleware #1
  - layout #2
- /books uses:
  - middleware #5
  - layout #7
- /books/create uses:
  - middleare #5
  - layout #6
- /books/{book}/edit uses:
  - middleware #5
  - layout #8
- /books/{book}/preview uses:
  - middleware #5
  - layout #9
- /catalog uses:
  - middleware #3
  - layout #4
