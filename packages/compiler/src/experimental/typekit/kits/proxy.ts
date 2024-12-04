import { Type } from "../../../core/index.js";
import { isTypeProxy, Proxiable, TYPE_PROXY } from "../../proxy.js";
import { defineKit } from "../define-kit.js";

/** @experimental */
interface ProxyKit {
  proxy: {
    /**
     * Resolve a type proxy to its base type.
     *
     * You should call this method whenever you have a proxy and need to pass the actual type reference to another
     * method.
     *
     * @see {@link TypeProxy}
     *
     * @param type - a type or a proxy for a type
     * @returns a reference to the type the proxy represents
     */
    resolve<T extends Type>(type: Proxiable<T>): T;
  };
}

declare module "../define-kit.js" {
  interface Typekit extends ProxyKit {}
}

defineKit<ProxyKit>({
  proxy: {
    resolve(type) {
      if (isTypeProxy(type)) {
        return (type as any)[TYPE_PROXY](this.program);
      }

      return type;
    },
  },
});
