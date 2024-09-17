# How to run the project

pnpm dev











# vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates.

However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can run `Volar: Switch TS Plugin on/off` from VS Code command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```




# tag color custom



todo
-search by province
-search by 


- influencer ranking: input number 1-5
()


-manage influencer data in one page

-can edit data on profile page





1


239105839960-ub7vdf4vqv8qhd9lqhspmgg71imq9u2m.apps.googleusercontent.com


youtube api key:
AIzaSyAPr6ti4hBb_9yYuYZPwCC8VfKUFqqVo3o


get channel subcriber number by channel id
https://www.googleapis.com/youtube/v3/channels?part=statistics&id=@MrBeast&key=AIzaSyAPr6ti4hBb_9yYuYZPwCC8VfKUFqqVo3o


convert channel name to channel id
https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=@MrBeast&key=AIzaSyAPr6ti4hBb_9yYuYZPwCC8VfKUFqqVo3o





https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=@MrBeast&key=AIzaSyAPr6ti4hBb_9yYuYZPwCC8VfKUFqqVo3o




GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forHandle=MrBeast&key=[YOUR_API_KEY] HTTP/1.1

Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json
