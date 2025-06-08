import { useState, useEffect } from "react";
import { getAllCategories } from "../service/categoryService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useCategory } from "../context/CategoryContext";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  LifebuoyIcon,
  Bars3Icon,
  CpuChipIcon,
  GiftIcon,
  CameraIcon,
  XMarkIcon,
  BookOpenIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

export default function Header() {
  const { setCategories } = useCategory();
  const [category, setCategory] = useState([]);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategory(data);
        setCategories(data)
        localStorage.setItem("categories", JSON.stringify(data))
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const iconMap = {
    1: CameraIcon,
    2: CpuChipIcon,
    3: GiftIcon,
    4: LifebuoyIcon,
    5: BookOpenIcon,
    6: PlayCircleIcon,
    7: PhoneIcon,
  };

  const adminMenu = [
    { label: "Quản lý tài khoản", href: "/management/user" },
    { label: "Quản lý sản phẩm", href: "/management/product" },
    { label: "Quản lý danh mục", href: "/management/category" },
    { label: "Quản lý đặt hàng", href: "/admin/orders" },
  ];

  return (
    <header className="bg-blue-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Trang chủ</span>
            <img alt="Logo" src="/img/logo.png" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-900"
          >
            <span className="sr-only">Mở menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Nếu là admin thì hiển thị dropdown quản lý */}
          {user && user.role === "ADMIN" ? (
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 outline-none focus:outline-none text-[20px] font-semibold text-blue-900 hover:text-[#8be76f] ">
                Quản lý
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-blue-400"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-64 overflow-hidden rounded-3xl bg-blue-50 shadow-lg ring-1 ring-blue-900/5"
              >
                <div className="p-4">
                  {adminMenu.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg p-4 font-semibold text-blue-900 hover:bg-blue-100"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          ) : (
            <Popover className="relative">
              <PopoverButton className="flex items-center outline-none focus:outline-none gap-x-1 text-[20px] font-semibold text-blue-900 hover:text-[#8be76f] ">
                Danh mục sản phẩm
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-blue-400"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-blue-50 shadow-lg ring-1 ring-blue-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4 max-h-110 overflow-y-auto">
                  {category.map((item, idx) => {
                    const IconComponent = iconMap[item.categoryId];
                    return (
                      <div
                        key={item.categoryId || idx}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-blue-100"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200">
                          {IconComponent ? (
                            <IconComponent
                              aria-hidden="true"
                              className="size-6 text-blue-600 group-hover:text-[#8be76f]"
                            />
                          ) : null}
                        </div>
                        <div className="flex-auto">
                          <a
                            href={`/category/${item.categoryId}`}
                            className="block font-semibold text-blue-900"
                          >
                            {item.categoryName}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-blue-700">
                            {item.categoryDescription}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PopoverPanel>
            </Popover>
          )}
          <a
            href="/product"
            className="font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] "
          >
            Sản phẩm
          </a>
          <a
            href="/cart"
            className="font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] "
          >
            Giỏ hàng
          </a>
          <a
            href="/about"
            className="font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] "
          >
            Về chúng tôi
          </a>
        </PopoverGroup>
        {!user ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/login"
              className="text-sm/6 font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] "
            >
              Đăng nhập <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex lg:items-center lg:space-x-6 pl-[100px] text-[20px]">
            <span className="text-blue-900 font-semibold ">
              <a href="/detail" className="text-[#3b82f6]">
                {user.username.toUpperCase()}
              </a>
            </span>
            <button
              aria-label="Giỏ hàng"
              className="relative hover:scale-110 transition cursor-pointer"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              <ShoppingCartIcon className="h-6 w-6 text-blue-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => logout()}
              className="text-red-600 hover:text-red-800 text-[16px] font-medium transition cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-blue-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-blue-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Về chúng tôi</span>
              <img alt="" src="/img/logo.png" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-blue-900"
            >
              <span className="sr-only">Đóng menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-blue-900/10">
              <div className="space-y-2 py-6">
                {/* Nếu là admin thì hiển thị menu quản lý */}
                {user && user.role === "ADMIN" ? (
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-blue-900 hover:bg-blue-100">
                      Quản lý
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="size-5 flex-none group-data-open:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {adminMenu.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-blue-900 hover:bg-blue-100"
                        >
                          {item.label}
                        </a>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ) : (
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-blue-900 hover:bg-blue-100">
                      Danh mục sản phẩm
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="size-5 flex-none group-data-open:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                      {category.map((item, idx) => {
                        const IconComponent = iconMap[item.categoryId];
                        return (
                          <DisclosureButton
                            key={item.categoryId || idx}
                            as="a"
                            href={item.href}
                            className="flex items-center gap-x-3 rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-blue-900 hover:bg-blue-100"
                          >
                            {IconComponent && (
                              <IconComponent className="size-5 text-blue-600" />
                            )}
                            {item.categoryName}
                          </DisclosureButton>
                        );
                      })}
                    </DisclosurePanel>
                  </Disclosure>
                )}
                <a
                  href="/product"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-blue-900 hover:bg-blue-100"
                >
                  Sản phẩm
                </a>
                <a
                  href="/cart"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-blue-900 hover:bg-blue-100"
                >
                  Giỏ hàng
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-blue-900 hover:bg-blue-100"
                >
                  Về chúng tôi
                </a>
                {user ? (
                  <>
                    <a
                      href="/detail"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#3b82f6] hover:bg-blue-100"
                    >
                      {user.username.toUpperCase()}
                    </a>
                    <button
                      onClick={logout}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-red-600 hover:text-red-800 hover:bg-blue-100"
                    >
                      Đăng xuất
                    </button>
                    <button
                      onClick={() => (window.location.href = "/cart")}
                      className="relative -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-blue-900 hover:bg-blue-100"
                    >
                      <span className="flex items-center">
                        <ShoppingCartIcon className="h-6 w-6 mr-2 text-blue-900" />
                        Giỏ hàng
                        {cartCount > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </span>
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-blue-900 hover:text-[#8be76f] hover:bg-blue-100"
                  >
                    Đăng nhập
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
