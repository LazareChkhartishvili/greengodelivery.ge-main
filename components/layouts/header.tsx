/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Input } from "../ui/input";
import { cartApi } from "@/lib/cart-api";
import { getCartTokenLS, setCartTokenLS } from "@/lib/cart-token";
import { Logo } from "./logo";
import { ModeToggle } from "../shared/theme-switcher";
import { ShoppingCart, X } from "lucide-react";
import LangSwitcher from "../shared/lang-switch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import HeaderButtons from "./header-buttons";
import { SessionUser } from "@/types";
import HeaderAnimate from "./header-animate";
import { getScopedI18n } from "@/locales/server";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { useScopedI18n } from "@/locales/client";
import useSearchCustomParams from "@/hooks/useSearchCustomParams";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CartDrawer } from "./cart-drawer";

const HeaderContainer = () => {
  const router = useRouter();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const { getQueryParamByKey } = useSearchCustomParams();
  const searchQuery = getQueryParamByKey("search") || "";
  const [searchQueryState, setSearchQueryState] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalQty, setTotalQty] = useState(0);

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchQueryState(searchValue);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        if (searchValue) {
          params.set("search", searchValue);
        } else {
          params.delete("search");
        }
        router.replace(`/companies?${params.toString()}`);
      }, 500);
    },
    [router]
  );

  useEffect(() => {
    if (!searchQuery) {
      setSearchQueryState("");
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    (async () => {
      const existing = getCartTokenLS();
      const token = await cartApi.init(existing || undefined);
      setCartTokenLS(token);
      const cart = await cartApi.get(token);
      setTotalQty(cart?.total_qty || 0);
    })();
  }, []);

  /*   const scopedT = await getScopedI18n("header")

  const session = (await getServerSession(authOptions)) as SessionUser | null
 */
  const scopedT = useScopedI18n("header");
  return (
    <div className="bg-muted">
      <HeaderAnimate>
        <nav className="fixed md:top-3 z-50 inset-x-0 md:inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl md:mx-auto mx-0 rounded-none md:rounded-xl">
          <div className="h-full flex items-center justify-between mx-auto px-4">
            <div className="flex items-center gap-0 md:gap-2 w-full max-w-[700px]">
              <Logo />
              <div className="relative w-full mr-2 hidden md:block">
                <Search className="h-5 w-5 absolute mt-2 ml-2.5" />
                <Input
                  value={searchQueryState}
                  onChange={searchHandler}
                  className="pl-9 flex-1 rounded-full max-w-[800px]"
                  placeholder={scopedT("search")}
                />
              </div>
              <Select defaultValue="tskaltubo">
                <SelectTrigger className="border-0 shadow-none font cursor-pointer dark:bg-background dark:hover:bg-background ">
                  <MapPin className="h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="cursor-pointer" value="tskaltubo">
                      {scopedT("tskaltubo")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex  justify-end md:justify-center md:w-auto items-center gap-1 md:gap-2">
              <ModeToggle />
              <LangSwitcher />
              {/*               <Button
                size="icon"
                className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
              >
                <Search className="!h-5 !w-5" />
              </Button> */}
              {/*               <HeaderButtons session={session} /> */}
              {/* CartIcon */}{" "}
              <div
                onClick={() => setIsCartOpen(true)}
                className="py-[8px] px-3 md:px-4 flex items-center gap-2 cursor-pointer border rounded-lg relative"
              >
                <ShoppingCart size={19} />
                {totalQty > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
                    {totalQty}
                  </span>
                )}
                <p className="hidden md:flex">{scopedT("cart")}</p>
              </div>
              <Button
                type="button"
                aria-label="Login"
                className="rounded-full text-white cursor-pointer"
              >
                <a
                  className="flex gap-2 items-center justify-center"
                  href="tel:+995598401240"
                >
                  <Phone className="mt-0.5" />
                  <p className="md:block hidden"> {scopedT("call")}</p>
                </a>
                {/*     <Link href="/login">{scopedT("signIn")}</Link> */}
              </Button>
              {/*  */}
              {isCartOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/40 z-[55]"
                    onClick={() => setIsCartOpen(false)}
                  />
                  <CartDrawer
                    onClose={async () => {
                      setIsCartOpen(false);
                      const token = getCartTokenLS();
                      if (token) {
                        const cart = await cartApi.get(token);
                        setTotalQty(cart?.total_qty || 0);
                      }
                    }}
                    onCartChange={(qty: number) => setTotalQty(qty)}
                  />
                </>
              )}
            </div>
          </div>
        </nav>
      </HeaderAnimate>
    </div>
  );
};

export default HeaderContainer;
