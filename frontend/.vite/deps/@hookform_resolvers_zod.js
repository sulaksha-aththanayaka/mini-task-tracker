import "./react-DlSlh26s.js";
import { appendErrors, get, set } from "./react-hook-form.js";

//#region node_modules/.pnpm/@hookform+resolvers@5.2.2_r_6b29a796a85fcfaccf30f581fee88f7b/node_modules/@hookform/resolvers/dist/resolvers.mjs
var r = (t, r, o) => {
	if (t && "reportValidity" in t) {
		const s = get(o, r);
		t.setCustomValidity(s && s.message || ""), t.reportValidity();
	}
}, o = (e, t) => {
	for (const o in t.fields) {
		const s = t.fields[o];
		s && s.ref && "reportValidity" in s.ref ? r(s.ref, o, e) : s && s.refs && s.refs.forEach((t) => r(t, o, e));
	}
}, s$1 = (r, s) => {
	s.shouldUseNativeValidation && o(r, s);
	const n = {};
	for (const o in r) {
		const f = get(s.fields, o), c = Object.assign(r[o] || {}, { ref: f && f.ref });
		if (i$1(s.names || Object.keys(r), o)) {
			const r = Object.assign({}, get(n, o));
			set(r, "root", c), set(n, o, r);
		} else set(n, o, c);
	}
	return n;
}, i$1 = (e, t) => {
	const r = n(t);
	return e.some((e) => n(e).match(`^${r}\\.\\d+`));
};
function n(e) {
	return e.replace(/\]|\[/g, "");
}

//#endregion
//#region node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/core.js
/** A special constant with type `never` */
const NEVER = Object.freeze({ status: "aborted" });
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
const globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}

//#endregion
//#region node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/util.js
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
		throw new Error("cached value already set");
	} };
}
const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
const allowsEval = cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
const NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) full.message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}

//#endregion
//#region node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
const $ZodError = $constructor("$ZodError", initializer);
const $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });

//#endregion
//#region node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/parse.js
const _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
const parse = /* @__PURE__ */ _parse($ZodRealError);
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
const parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
const _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
const encode = /* @__PURE__ */ _encode($ZodRealError);
const _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
const decode = /* @__PURE__ */ _decode($ZodRealError);
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
const encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
const decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
const _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
const safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
const _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
const safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

//#endregion
//#region node_modules/.pnpm/@hookform+resolvers@5.2.2_r_6b29a796a85fcfaccf30f581fee88f7b/node_modules/@hookform/resolvers/zod/dist/zod.mjs
function t(r, e) {
	try {
		var o = r();
	} catch (r) {
		return e(r);
	}
	return o && o.then ? o.then(void 0, e) : o;
}
function s(r, e) {
	for (var n = {}; r.length;) {
		var t = r[0], s = t.code, i = t.message, a = t.path.join(".");
		if (!n[a]) if ("unionErrors" in t) {
			var u = t.unionErrors[0].errors[0];
			n[a] = {
				message: u.message,
				type: u.code
			};
		} else n[a] = {
			message: i,
			type: s
		};
		if ("unionErrors" in t && t.unionErrors.forEach(function(e) {
			return e.errors.forEach(function(e) {
				return r.push(e);
			});
		}), e) {
			var c = n[a].types, f = c && c[t.code];
			n[a] = appendErrors(a, e, n, s, f ? [].concat(f, t.message) : t.message);
		}
		r.shift();
	}
	return n;
}
function i(r, e) {
	for (var n = {}; r.length;) {
		var t = r[0], s = t.code, i = t.message, a = t.path.join(".");
		if (!n[a]) if ("invalid_union" === t.code && t.errors.length > 0) {
			var u = t.errors[0][0];
			n[a] = {
				message: u.message,
				type: u.code
			};
		} else n[a] = {
			message: i,
			type: s
		};
		if ("invalid_union" === t.code && t.errors.forEach(function(e) {
			return e.forEach(function(e) {
				return r.push(e);
			});
		}), e) {
			var c = n[a].types, f = c && c[t.code];
			n[a] = appendErrors(a, e, n, s, f ? [].concat(f, t.message) : t.message);
		}
		r.shift();
	}
	return n;
}
function a(o$1, a, u) {
	if (void 0 === u && (u = {}), function(r) {
		return "_def" in r && "object" == typeof r._def && "typeName" in r._def;
	}(o$1)) return function(n, i, c) {
		try {
			return Promise.resolve(t(function() {
				return Promise.resolve(o$1["sync" === u.mode ? "parse" : "parseAsync"](n, a)).then(function(e) {
					return c.shouldUseNativeValidation && o({}, c), {
						errors: {},
						values: u.raw ? Object.assign({}, n) : e
					};
				});
			}, function(r) {
				if (function(r) {
					return Array.isArray(null == r ? void 0 : r.issues);
				}(r)) return {
					values: {},
					errors: s$1(s(r.errors, !c.shouldUseNativeValidation && "all" === c.criteriaMode), c)
				};
				throw r;
			}));
		} catch (r) {
			return Promise.reject(r);
		}
	};
	if (function(r) {
		return "_zod" in r && "object" == typeof r._zod;
	}(o$1)) return function(s, c, f) {
		try {
			return Promise.resolve(t(function() {
				return Promise.resolve(("sync" === u.mode ? parse : parseAsync)(o$1, s, a)).then(function(e) {
					return f.shouldUseNativeValidation && o({}, f), {
						errors: {},
						values: u.raw ? Object.assign({}, s) : e
					};
				});
			}, function(r) {
				if (function(r) {
					return r instanceof $ZodError;
				}(r)) return {
					values: {},
					errors: s$1(i(r.issues, !f.shouldUseNativeValidation && "all" === f.criteriaMode), f)
				};
				throw r;
			}));
		} catch (r) {
			return Promise.reject(r);
		}
	};
	throw new Error("Invalid input: not a Zod schema");
}

//#endregion
export { a as zodResolver };
//# sourceMappingURL=@hookform_resolvers_zod.js.map