"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 937:
/***/ ((module) => {

module.exports = import("@trpc/server");;

/***/ }),

/***/ 282:
/***/ ((module) => {

module.exports = import("@trpc/server/adapters/next");;

/***/ }),

/***/ 926:
/***/ ((module) => {

module.exports = import("zod");;

/***/ }),

/***/ 395:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);
/* harmony import */ var _server_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(487);
/* harmony import */ var _server_routers_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(930);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__, _server_routers_app__WEBPACK_IMPORTED_MODULE_2__]);
([_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__, _server_routers_app__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__.createNextApiHandler({
    router: _server_routers_app__WEBPACK_IMPORTED_MODULE_2__/* .appRouter */ .q,
    createContext: _server_context__WEBPACK_IMPORTED_MODULE_1__/* .createContext */ .k,
    onError ({ error  }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
            console.error("Something went wrong", error);
        }
    }
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "k": () => (/* binding */ createContext)
});

;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
;// CONCATENATED MODULE: ./src/utils/mongodb.ts

const uri = process.env.MONGO_URI ?? "";
const _client = new external_mongodb_namespaceObject.MongoClient(uri);
// connectDB connects to provided uri Mongo Database
async function connectDB() {
    await _client.connect();
}
connectDB();
/**
 *  returns Db instance of provided Database Name
 *
 * @param dbName Database name
 * @returns Db instance
 */ function getDB(dbName) {
    return _client.db(dbName);
}

;// CONCATENATED MODULE: ./src/server/context.ts

const createContext = async (opts)=>{
    const dbName = process.env.DATABASE ?? "";
    const collectionName = process.env.COLLECTION ?? "";
    const db = getDB(dbName);
    const msg = db.collection(collectionName);
    return {
        req: opts?.req,
        msg
    };
};


/***/ }),

/***/ 930:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ appRouter)
/* harmony export */ });
/* harmony import */ var _trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(503);
/* harmony import */ var _msg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(973);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc__WEBPACK_IMPORTED_MODULE_0__, _msg__WEBPACK_IMPORTED_MODULE_1__]);
([_trpc__WEBPACK_IMPORTED_MODULE_0__, _msg__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const appRouter = _trpc__WEBPACK_IMPORTED_MODULE_0__.t.router({
    msg: _msg__WEBPACK_IMPORTED_MODULE_1__/* .msgRouter */ .N
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 973:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ msgRouter)
/* harmony export */ });
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(937);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(926);
/* harmony import */ var _trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(503);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(121);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_server__WEBPACK_IMPORTED_MODULE_0__, zod__WEBPACK_IMPORTED_MODULE_1__, _trpc__WEBPACK_IMPORTED_MODULE_2__]);
([_trpc_server__WEBPACK_IMPORTED_MODULE_0__, zod__WEBPACK_IMPORTED_MODULE_1__, _trpc__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const msgRouter = _trpc__WEBPACK_IMPORTED_MODULE_2__.t.router({
    list: _trpc__WEBPACK_IMPORTED_MODULE_2__.t.procedure.query(async ({ ctx  })=>{
        try {
            const messages = await ctx.msg.find().toArray();
            return messages;
        } catch (_err) {
            const err = _err;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
                code: _utils_constants__WEBPACK_IMPORTED_MODULE_3__/* .INTERNAL_SERVER_ERROR */ .b,
                message: "Something went wrong. Failed to fetch messages!",
                cause: err.message
            });
        }
    }),
    add: _trpc__WEBPACK_IMPORTED_MODULE_2__.t.procedure.input(zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
        text: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
        createdAt: zod__WEBPACK_IMPORTED_MODULE_1__.z.date(),
        creator: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
    })).mutation(async ({ ctx , input  })=>{
        try {
            const result = await ctx.msg.insertOne(input);
            return {
                _id: result.insertedId,
                text: input.text,
                createdAt: input.createdAt,
                creator: input.creator
            };
        } catch (_err) {
            const err = _err;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
                code: _utils_constants__WEBPACK_IMPORTED_MODULE_3__/* .INTERNAL_SERVER_ERROR */ .b,
                message: "Something went wrong. Failed to send message!",
                cause: err.message
            });
        }
    })
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 503:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(937);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superjson__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_server__WEBPACK_IMPORTED_MODULE_0__]);
_trpc_server__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const t = _trpc_server__WEBPACK_IMPORTED_MODULE_0__.initTRPC.context().create({
    transformer: (superjson__WEBPACK_IMPORTED_MODULE_1___default())
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ INTERNAL_SERVER_ERROR)
/* harmony export */ });
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(395));
module.exports = __webpack_exports__;

})();