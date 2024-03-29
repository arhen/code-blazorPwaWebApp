console.log("This is service worker talking!");
var cacheName = 'blazor-pwa-web-app';
var filesToCache = [
    //Html and css files
    'index.html',
    'css/site.css',
    'css/bootstrap/bootstrap.min.css',
    'css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    'css/open-iconic/font/fonts/open-iconic.woff',
    //Blazor framework
    '_framework/blazor.webassembly.js',
    '_framework/blazor.server.js',
    '_framework/blazor.boot.json',
    //Our additional files
    'manifest.json',
    'serviceworker.js',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
    //The web assembly/.net dll's
    '_framework/wasm/mono.js',
    '_framework/wasm/mono.wasm',
    '_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    '_framework/_bin/Microsoft.AspNetCore.Blazor.Components.Browser.dll',
    '_framework/_bin/Microsoft.AspNetCore.Blazor.Components.dll',
    '_framework/_bin/Microsoft.AspNetCore.Metadata.dll',
    '_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll',
    '_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll',
    '_framework/_bin/Microsoft.Extensions.Options.dll',
    '_framework/_bin/Microsoft.Extensions.Primitives.dll',
    '_framework/_bin/Microsoft.JSInterop.dll',
    '_framework/_bin/Mono.Security.dll',
    '_framework/_bin/Mono.WebAssembly.Interop.dll',
    '_framework/_bin/mscorlib.dll',
    '_framework/_bin/System.Net.Http.dll',
    '_framework/_bin/Mono.WebAssembly.Interop.dll',
    '_framework/_bin/System.dll',
    '_framework/_bin/System.Buffers.dll',
    '_framework/_bin/System.ComponentModel.Annotations.dll',
    '_framework/_bin/System.Core.dll',
    //The compiled project .dll's
    '_framework/_bin/blazorPwaWebApp.dll'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Sudah terinstall');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] telah caching files');
            return cache.addAll(filesToCache)
                .then(() => console.log('Asset telah dicaching'))
                .catch(err => console.log('Error saat caching', err))
        }));
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {
            ignoreSearch: true
        }).then(response => {
            return response || fetch(event.request);
        })
    );
});