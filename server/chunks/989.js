"use strict";
exports.id = 989;
exports.ids = [989];
exports.modules = {

/***/ 989:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ createTRPCNext)
/* harmony export */ });
/* unused harmony export withTRPC */
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(752);
/* harmony import */ var _trpc_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(157);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react_ssr_prepass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(583);
/* harmony import */ var _trpc_react_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(173);
/* harmony import */ var _trpc_server_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(558);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _trpc_react__WEBPACK_IMPORTED_MODULE_1__, _trpc_react_shared__WEBPACK_IMPORTED_MODULE_4__, _trpc_server_shared__WEBPACK_IMPORTED_MODULE_5__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _trpc_react__WEBPACK_IMPORTED_MODULE_1__, _trpc_react_shared__WEBPACK_IMPORTED_MODULE_4__, _trpc_server_shared__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function transformQueryOrMutationCacheErrors(result) {
    const error = result.state.error;
    if (error instanceof Error && error.name === 'TRPCClientError') {
        const newError = {
            message: error.message,
            data: error.data,
            shape: error.shape
        };
        return {
            ...result,
            state: {
                ...result.state,
                error: newError
            }
        };
    }
    return result;
}
function withTRPC(opts) {
    const { config: getClientConfig  } = opts;
    return (AppOrPage)=>{
        const trpc = (0,_trpc_react__WEBPACK_IMPORTED_MODULE_1__.createReactQueryHooks)();
        const WithTRPC = (props)=>{
            const [prepassProps] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(()=>{
                if (props.trpc) {
                    return props.trpc;
                }
                const config = getClientConfig({});
                const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClient(config.queryClientConfig);
                const trpcClient = trpc.createClient(config);
                return {
                    abortOnUnmount: config.abortOnUnmount,
                    queryClient,
                    trpcClient,
                    ssrState: opts.ssr ? 'mounting' : false,
                    ssrContext: null
                };
            });
            const { queryClient , trpcClient , ssrState , ssrContext  } = prepassProps;
            const hydratedState = trpc.useDehydratedState(trpcClient, // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props.pageProps.trpcState);
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(trpc.Provider, {
                abortOnUnmount: prepassProps.abortOnUnmount ?? false,
                client: trpcClient,
                queryClient: queryClient,
                ssrState: ssrState,
                ssrContext: ssrContext
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClientProvider, {
                client: queryClient
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.Hydrate, {
                state: hydratedState
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(AppOrPage, Object.assign({}, props)))));
        };
        if (AppOrPage.getInitialProps || opts.ssr) {
            WithTRPC.getInitialProps = async (appOrPageCtx)=>{
                const AppTree = appOrPageCtx.AppTree;
                // Determine if we are wrapping an App component or a Page component.
                const isApp = !!appOrPageCtx.Component;
                const ctx = isApp ? appOrPageCtx.ctx : appOrPageCtx;
                // Run the wrapped component's getInitialProps function.
                let pageProps = {};
                if (AppOrPage.getInitialProps) {
                    const originalProps = await AppOrPage.getInitialProps(appOrPageCtx);
                    const originalPageProps = isApp ? originalProps.pageProps ?? {} : originalProps;
                    pageProps = {
                        ...originalPageProps,
                        ...pageProps
                    };
                }
                const getAppTreeProps = (props)=>isApp ? {
                        pageProps: props
                    } : props;
                if (typeof window !== 'undefined' || !opts.ssr) {
                    return getAppTreeProps(pageProps);
                }
                const config = getClientConfig({
                    ctx
                });
                const trpcClient = (0,_trpc_react__WEBPACK_IMPORTED_MODULE_1__.createTRPCClient)(config);
                const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClient(config.queryClientConfig);
                const trpcProp = {
                    config,
                    trpcClient,
                    queryClient,
                    ssrState: 'prepass',
                    ssrContext: ctx
                };
                const prepassProps = {
                    pageProps,
                    trpc: trpcProp
                };
                // Run the prepass step on AppTree. This will run all trpc queries on the server.
                // multiple prepass ensures that we can do batching on the server
                while(true){
                    // render full tree
                    await react_ssr_prepass__WEBPACK_IMPORTED_MODULE_3__(/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(AppTree, prepassProps));
                    if (!queryClient.isFetching()) {
                        break;
                    }
                    // wait until the query cache has settled it's promises
                    await new Promise((resolve)=>{
                        const unsub = queryClient.getQueryCache().subscribe((event)=>{
                            if (event?.query.getObserversCount() === 0) {
                                resolve();
                                unsub();
                            }
                        });
                    });
                }
                const dehydratedCache = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.dehydrate)(queryClient, {
                    shouldDehydrateQuery () {
                        // makes sure errors are also dehydrated
                        return true;
                    }
                });
                // since error instances can't be serialized, let's make them into `TRPCClientErrorLike`-objects
                const dehydratedCacheWithErrors = {
                    ...dehydratedCache,
                    queries: dehydratedCache.queries.map(transformQueryOrMutationCacheErrors),
                    mutations: dehydratedCache.mutations.map(transformQueryOrMutationCacheErrors)
                };
                // dehydrate query client's state and add it to the props
                pageProps.trpcState = trpcClient.runtime.transformer.serialize(dehydratedCacheWithErrors);
                const appTreeProps = getAppTreeProps(pageProps);
                const meta = opts.responseMeta?.({
                    ctx,
                    clientErrors: [
                        ...dehydratedCache.queries,
                        ...dehydratedCache.mutations
                    ].map((v)=>v.state.error).flatMap((err)=>err instanceof Error && err.name === 'TRPCClientError' ? [
                            err
                        ] : [])
                }) || {};
                for (const [key, value] of Object.entries(meta.headers || {})){
                    if (typeof value === 'string') {
                        ctx.res?.setHeader(key, value);
                    }
                }
                if (meta.status && ctx.res) {
                    ctx.res.statusCode = meta.status;
                }
                return appTreeProps;
            };
        }
        const displayName = AppOrPage.displayName || AppOrPage.name || 'Component';
        WithTRPC.displayName = `withTRPC(${displayName})`;
        return WithTRPC;
    };
}

function createTRPCNext(opts) {
    const hooks = (0,_trpc_react_shared__WEBPACK_IMPORTED_MODULE_4__.createHooksInternal)();
    // TODO: maybe set TSSRContext to `never` when using `WithTRPCNoSSROptions`
    const _withTRPC = withTRPC(opts);
    return (0,_trpc_server_shared__WEBPACK_IMPORTED_MODULE_5__.createFlatProxy)((key)=>{
        if (key === 'useContext') {
            return ()=>{
                const context = hooks.useContext();
                // create a stable reference of the utils context
                return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
                    return (0,_trpc_react_shared__WEBPACK_IMPORTED_MODULE_4__.createReactQueryUtilsProxy)(context);
                }, [
                    context
                ]);
            };
        }
        if (key === 'withTRPC') {
            return _withTRPC;
        }
        return (0,_trpc_react_shared__WEBPACK_IMPORTED_MODULE_4__.createReactProxyDecoration)(key, hooks);
    });
}



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;