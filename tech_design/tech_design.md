# Gelato gallery app design

## Current app design

![](./../screenshots/app_design.png)

## Design decisons

- Redux vs Context api and hooks
- Class component vs Functional components

### Redux vs Context api and hooks

I preferred Context api and hooks over Redux for creating this application.
Here're my reasons.

- Bundle side <br/>
  Redux is a 3rd party package and needs to be setup via npm or yarn. Most of the times
  Redux itself is not sufficient and you need to add middlewares. This increases overall
  bundle size. Context api and hooks are very much part of react api and no extra installation is needed.

- Boilerplate code <br/>
  With Redux, we need to have an exhaustive setup, we need to build a store, and we need to dispatch actions. We then need to connect our store with our components. Sometimes, this is a pain for a developer. There is a high chance that one might get lost in the codes and just wander aimlessly with no clue on how to fix anything. Basically, you need to have a hands-on approach to work with Redux. According to me, Context APIs involve less boilerplate codes. With the introduction of React 16.6, we don’t even need the consumer. With just one line of code, you can get access to your context.

- Handle async code <br/>
  In Context APIs, triggering an API (async codes) is relatively straightforward to use once you get the hang of it (especially when using Hooks). You also don’t need a package like redux-thunk or saga to handle asynchronous actions.

### Class component vs Functional components

I've made use of functional component instead of class components. Functional components are nothing but stateless functions which return JSX.
I think, overall React community is moving towards functional component so that's the reason I've chosen functional component

## Backend improvements

- Thumbnail support <br/>
  The `/list` api provided by Picsum does not provide thumbnail support. In order efficiently
  render the home screen with thumbnails, backend should provide thumbnail url along with full image url. This will make sure home screen renders efficiently and also for rendering bigger images we can display thumbnail first and progressively render bigger images. This improves overall experience of the user.

- Provide valid PNG/JPEG files for caching <br/>
  For caching of images I've tried 2 npm packages FastImage and imageHOC but both were not able to cache the images. Reason being, the url of the images can not be cached since auth token gets appended when image request is made. This makes it hard to use existing packages to cache the images.
  Image caching will improve the overall performance but due to limitations from API it's not straightforward to achieve it with npm available packages.
  More code needs to be written for image caching.

## Bugs in the existing system

- When user tries to share an image, it takes 2-3 seconds to load share option. Reason being, image data needs to be downloaded before the images. This can be improved by showing loader.

## Challeges

- I had faced one issue related to use of hooks. It was working fine in development but in release build it was giving invalid use of hooks error. Had to spend atleast 10 hours to get around this issue. Overall it was a good learning since I was using hooks for the very first time.
- Image caching, previously I had used 2 packages for caching but both were not working with picsum because auth token that gets dynamically. I had spent good amount of time on this but I had to let this feature go because of timelines.
  I wish to work on this further.
