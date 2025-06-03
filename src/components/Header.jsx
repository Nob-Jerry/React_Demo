import { useState } from 'react'
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
} from '@headlessui/react'
import {
  LifebuoyIcon,
  Bars3Icon,
  CpuChipIcon,
  GiftIcon,
  CameraIcon,
  XMarkIcon,
  BookOpenIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'FLOWER', description: 'Hoa tươi, hoa bó, hoa chậu', href: '/category/flower', icon: GiftIcon },
  { name: 'FASHION', description: 'Thời trang, quần áo, phụ kiện', href: '/category/fashion', icon: CameraIcon },
  { name: 'WATCH', description: 'Đồng hồ nam, nữ, cặp đôi', href: '/category/watch', icon: LifebuoyIcon },
  { name: 'ELECTRONICS', description: 'Thiết bị điện tử, công nghệ', href: '/category/electronics', icon: CpuChipIcon },
  { name: 'BOOK', description: 'Sách, truyện, kỹ năng sống', href: '/category/book', icon: BookOpenIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-blue-50">
  <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <div className="flex lg:flex-1">
      <a href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Trang chủ</span>
        <img
          alt="Logo"
          src="/img/logo.png"
          className="h-8 w-auto"
        />
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
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-x-1 text-[20px] font-semibold text-blue-900 hover:text-[#8be76f] ">
          Danh mục sản phẩm
          <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-blue-400" />
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-blue-50 shadow-lg ring-1 ring-blue-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
        >
          <div className="p-4">
            {products.map((item) => (
              <div
                key={item.name}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-blue-100"
              >
                <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200">
                  <item.icon aria-hidden="true" className="size-6 text-blue-600 group-hover:text-[#8be76f]" />
                </div>
                <div className="flex-auto">
                  <a href={item.href} className="block font-semibold text-blue-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-blue-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-blue-900/5 bg-blue-100">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-blue-900 hover:bg-blue-200"
              >
                <item.icon aria-hidden="true" className="size-5 flex-none text-blue-400" />
                {item.name}
              </a>
            ))}
          </div>
        </PopoverPanel>
      </Popover>

      <a href="/product" className="font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] ">
        Sản phẩm
      </a>
      <a href="/cart" className="font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] ">
        Giỏ hàng
      </a>
      <a href="/about" className="font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] ">
        Về chúng tôi
      </a>
    </PopoverGroup>
    {!user ? (
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/login" className="text-sm/6 font-semibold text-[20px] text-blue-900 hover:text-[#8be76f] ">
          Đăng nhập <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    ):(
      <div className="hidden lg:flex lg:items-center lg:space-x-6 pl-[100px] text-[20px]">
        <span className="text-blue-900 font-semibold ">
          <a href='/detail' className="text-[#3b82f6]">{user.username.toUpperCase()}</a>
        </span>
        <button
          aria-label="Giỏ hàng"
          className="relative hover:scale-110 transition cursor-pointer"
          onClick={() => {
            window.location.href = '/cart';
          }}
        >
          <ShoppingCartIcon className="h-6 w-6 text-blue-900" />
          <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
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
  <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
    <div className="fixed inset-0 z-10" />
    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-blue-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-blue-900/10">
      <div className="flex items-center justify-between">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Về chúng tôi</span>
          <img
            alt=""
            src="/img/logo.png"
            className="h-8 w-auto"
          />
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
            <Disclosure as="div" className="-mx-3">
              <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-blue-900 hover:bg-blue-100">
                Danh mục sản phẩm
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 space-y-2">
                {[...products, ...callsToAction].map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-blue-900 hover:bg-blue-100"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </DisclosurePanel>
            </Disclosure>
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
          </div>
          <div className="py-6">
            <a
              href="/login"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-blue-900 hover:bg-blue-100"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</header>

  )
}
