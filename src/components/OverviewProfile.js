// import logo from '../../assets/logo.svg'
import { ArrowCircleLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

const MenuValue = () => {
  return (
    <div className="w-1/3 mx-8 py-28 border-l border-r border-gray-400 border-opacity-40 font-nunito text-sm lg:text-base overflow-y-hidden">
        <div>
            {/* <img src={logo} alt="Gramedia Digital" className="w-45 mx-auto" /> */}
            <div className="pt-8">
                <img className="w-32 rounded-full mx-auto"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F365webresources.com%2Fwp-content%2Fuploads%2F2016%2F09%2FFREE-PROFILE-AVATARS.png&f=1&nofb=1"/>
                <div className="pt-4 flex flex-col items-center">
                    <h1 className="text-lg font-bold text-blue-500">VI6G36</h1>
                    <span className="text-gray-600">jatmiko</span>
                    <span className="text-gray-400">jatmiko@gmail.com</span>
                </div>
            </div>
        </div>
        <div className="pt-6">
            <div className="pt-4 pb-2 px-8 flex items-center space-x-3 border-t border-gray-400 border-opacity-30">
                <ArrowCircleLeftIcon className="h-6 w-6" fill="none" stroke="currentColor"/>
                <span className="block text-gray-500">
                    Kembali ke https://www.ovaltech.id/
                </span>
            </div>
            <div className="py-2 px-8 flex items-center justify-between border-t border-gray-400 border-opacity-30">
                <div className="flex items-center space-x-3">
                    <ArrowCircleLeftIcon className="h-6 w-6" fill="none" stroke="currentColor"/>
                    <div>
                        <span className="block text-gray-500">
                            Poin Saya
                        </span>
                        <span className="block font-bold">
                            0 Poin
                        </span>
                    </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>
            </div>
            <div className="py-2 px-8 flex items-center justify-between border-t border-gray-400 border-opacity-30">
                <div className="flex items-center space-x-3">
                    <ArrowCircleLeftIcon className="h-6 w-6" fill="none" stroke="currentColor"/>
                    <div>
                        <span className="block text-gray-500">
                            Kartu Saya
                        </span>
                        <span className="block font-bold">
                            0 Kartu
                        </span>
                    </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>
            </div>
            <div className="py-2 px-8 flex items-center justify-between border-t border-gray-400 border-opacity-30">
                <div className="flex items-center space-x-3">
                    <ArrowCircleLeftIcon className="h-6 w-6" fill="none" stroke="currentColor"/>
                    <div>
                        <span className="block text-gray-500">
                            Referal
                        </span>
                        <span className="block font-bold">
                            Buat Kode Referal
                        </span>
                    </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>
            </div>
            <div className="py-4 px-8 text-gray-500 flex items-center justify-between border-t border-gray-400 border-opacity-30">
                <span className="block text-gray-500">
                    Pengaturan
                </span>
                <ChevronRightIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>
            </div>
        </div>
    </div>
  )
}

export default MenuValue