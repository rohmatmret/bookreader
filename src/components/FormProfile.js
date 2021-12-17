/* eslint-disable default-case */
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import DatePicker from '../components/Datepicker'
import axios from 'axios'

const ValueOverview = () => {
    const [dropdown, setDropdown] = useState(false)
    const [service, setService] = useState('')
    const [selGender, setSelGender] = useState('Jenis Kelamin')
    const [selWork, setSelWork] = useState('Pekerjaan')
    const [selProvinsi, setSelProvinsi] = useState({title:'provinsi'})
    const [selKota, setSelKota] = useState({title:'Kota/Kabupaten'})
    const [selKec, setSelKec] = useState({title:'Kecamatan'})
    const [selKel, setSelKel] = useState({village:'Kelurahan'})
    const [isActive, setIsActive] = useState(false)
    const [dataArray, setDataArray] = useState([])
    const [dataArrayCity, setDataArrayCity] = useState([])
    const [dataArrayDistrict, setDataArrayDistrict] = useState([])
    const [dataZipCode, setDataZipCode] = useState([])
    var payload = {}

    const toggleDropdown = (serv) => {
        setService(serv)
        dropdown === false ? setDropdown(true) : setDropdown(false)
    }

    const getProvice = () => {
        axios.get('https://auth.ovaltech.id/v1/location/province/')
        .then((res) => {
            setDataArray(res.data)
        })
        .catch((err) => {
            console.log(err);
            alert(JSON.stringify(err));
        });
    }

    const getCity = (id) => {
        axios.get('https://auth.ovaltech.id/v1/location/city/?province_id=' + id)
        .then((res) => {
            console.log(res)
            setDataArrayCity(res.data)
        })
        .catch((err) => {
            console.log(err);
            alert(JSON.stringify(err));
        });
    }

    const getDistrict = (id) => {
        axios.get('https://auth.ovaltech.id/v1/location/district/?city_id=' + id)
        .then((res) => {
            console.log(res, 'district')
            setDataArrayDistrict(res.data)
        })
        .catch((err) => {
            console.log(err);
            alert(JSON.stringify(err));
        });
    }

    const getZipCode = (id) => {
        axios.get('https://auth.ovaltech.id/v1/location/zipcode/?district_id=' + id)
        .then((res) => {
            console.log(res)
            setDataZipCode(res.data)
        })
        .catch((err) => {
            console.log(err);
            alert(JSON.stringify(err));
        });
    }




    const toggleSelect = (e) => {
        if (service === 'gender') {
          switch (e) {
            case 'Laki - laki':
              setSelGender('Laki - laki')
              break
            case 'Perempuan':
              setSelGender('Perempuan')
              break
          }
        } else if (service === 'work') {
          switch (e) {
            case 'Backend Developer':
              setSelWork('Backend Developer')
              break
            case 'Frontend Developer':
              setSelWork('Frontend Developer')
              break
          }
        } 
        // else if (service === 'provinsi') {
        //   switch (e) {
        //     case 'Jawa Timur':
        //       setSelProvinsi('Jawa Timur')
        //       break
        //     case 'Jawa Barat':
        //       setSelProvinsi('Jawa Barat')
        //       break
        //   }
        // } 
        else if (service === 'kota') {
          switch (e) {
            case 'Malang':
              setSelKota('Malang')
              break
            case 'Surabaya':
              setSelKota('Surabaya')
              break
          }
        } else if (service === 'kec') {
          switch (e) {
            case 'Bululawang':
              setSelKec('Bululawang')
              break
            case 'Gondanglegi':
              setSelKec('Gondanglegi')
              break
          }
        } else if (service === 'kel') {
          switch (e) {
            case 'Kuwolu':
              setSelKel('Kuwolu')
              break
            case 'Krebet':
              setSelKel('Krebet')
              break
          }
        }
        setDropdown(false)
        setIsActive(true)
    }

    const handleSetProvince = (e) => {
        setSelProvinsi(e)
        getCity(e.id)
        setDropdown(false)
    }

    const handleSetCity = (e) => {
        setSelKota(e)
        getDistrict(e.id)
        setDropdown(false)
    }

    const handleSetDistrict = (e) => {
        setSelKec(e)
        getZipCode(e.id)
        setDropdown(false)
    }

    const handleZipCode = (e) => {
        setSelKel(e)
        setDropdown(false)
        console.log(selProvinsi)
        console.log(selKota)
        console.log(selKec)
        console.log(selKel)
    }

    useEffect(() => {
        getProvice()
    },[])

    
    return (
        <div className="px-10 w-2/3 h-screen container mx-auto font-nunito text-sm lg:text-base overflow-y-auto">
        <div className="flex py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="w-1/6">
                <span className="block text-gray-700">Foto Profil</span>
            </div>
            <div className="w-5/6">
                <img className="w-32 rounded-full"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F365webresources.com%2Fwp-content%2Fuploads%2F2016%2F09%2FFREE-PROFILE-AVATARS.png&f=1&nofb=1"/>
            </div>
        </div>
        <div className="flex py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="w-1/6">
                <span className="block text-gray-700">Nama</span>
            </div>
            <div className="w-5/6">
                <span className="block text-gray-500">
                    Nama Depan
                </span>
                <span className="block font-bold">
                    Jatmiko
                </span>
                <span className="block text-gray-500">
                    Nama Belakang
                </span>
                <span className="block font-bold">

                </span>
            </div>
        </div>
        {/* <div className="flex py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="w-1/6">
                <span className="block text-gray-700">Nomor HP</span>
            </div>
            <div className="w-5/6">
                <div className="bg-gray-200 px-4 py-4 border-b border-dotted border-gray-500">
                    <input placeholder="Nomor HP"
                        className="bg-gray-200 text-gray-500 outline-none w-full"
                    />
                </div>
                <div className="pt-8">
                    <span className="block text-sm text-gray-500">
                        Nomor HP telah terverifikasi
                    </span>
                    <button className="mt-4 py-2 w-full font-bold bg-blue-700 rounded-full uppercase">
                        Ubah Nomor
                    </button>
                </div>
            </div>
        </div> */}
        {/* <div className="py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="flex">
                <div className="w-1/6">
                    <span className="block text-gray-700">E-mail</span>
                </div>
                <div className="w-5/6">
                    <div className="bg-gray-200 px-4 py-4 border-b border-dotted border-gray-500">
                        <input placeholder="Nomor E-mail" type="email"
                            className="bg-gray-200 text-gray-500 outline-none w-full"
                        />
                    </div>
                    <div className="pt-8">
                        <span className="block text-sm text-gray-500">
                            E-mail telah terverifikasi
                        </span>
                        <button className="mt-4 py-2 w-full font-bold bg-blue-700 rounded-full uppercase">
                            Ubah E-mail
                        </button>
                    </div>
                </div>
            </div>
        </div> */}
        {/* <div className="py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="flex">
                <div className="w-1/6">
                    <span className="block text-gray-700">Password</span>
                </div>
                <div className="w-5/6">
                    <div className="bg-gray-200 px-4 py-4 border-b border-dotted border-gray-500">
                        <input placeholder="Password" type="password"
                            className="bg-gray-200 text-gray-500 outline-none w-full"
                        />
                    </div>
                    <div className="pt-8">
                        <button className="mt-4 py-2 w-full font-bold bg-blue-700 rounded-full uppercase">
                            Ubah Password
                        </button>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="flex">
                <div className="w-1/6">
                    <span className="block text-gray-700">Detil Akun</span>
                </div>
                <div className="w-5/6">
                    <div className="relative bg-gray-200 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Jenis Kelamin</span> */}
                        <div onClick={() => toggleDropdown('gender')} className="flex px-4 items-center justify-between">
                            <span className="bg-gray-200 text-gray-500 outline-none w-full">
                                {selGender}
                            </span>
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" fill="currentColor"/>
                        </div>
                        {
                            (dropdown && service === 'gender') && <div className="absolute z-10 w-full mt-5 bg-white shadow">
                                <ul>
                                    <li onClick={() => toggleSelect('Laki - laki')} className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center">
                                        Laki - laki {(selGender === 'Laki - laki' && isActive) && <CheckIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>}
                                    </li>
                                    <li onClick={() => toggleSelect('Perempuan')} className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center">
                                        Perempuan {(selGender === 'Perempuan' && isActive) && <CheckIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>}
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="bg-gray-200 mt-4 px-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Tanggal Lahir</span> */}
                        <input type="date" placeholder="Tanggal Lahir"
                            className="bg-gray-200 text-gray-500 outline-none w-full"
                            onChange={(e)=> {console.log(e.target.value)}}
                        />
                        {/* <DatePicker/> */}
                    </div>
                    <div className="bg-gray-200 mt-4 px-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Nomor KTP</span> */}
                        <input placeholder="Nomor KTP"
                            className="bg-gray-200 text-gray-500 outline-none w-full"
                        />
                    </div>
                    <div className="relative bg-gray-200 mt-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Jenis Kelamin</span> */}
                        <div onClick={() => toggleDropdown('work')} className="flex px-4 items-center justify-between">
                            <span className="bg-gray-200 text-gray-500 outline-none w-full">
                                {selWork}
                            </span>
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" fill="currentColor"/>
                        </div>
                        {
                            (dropdown && service === 'work') && <div className="absolute z-10 w-full mt-5 bg-white">
                                <ul>
                                    <li onClick={() => toggleSelect('Backend Developer')} className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center">
                                        Backend Developer {(selWork === 'Backend Developer' && isActive) && <CheckIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>}
                                    </li>
                                    <li onClick={() => toggleSelect('Frontend Developer')} className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center">
                                        Frontend Developer {(selWork === 'Frontend Developer' && isActive) && <CheckIcon className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor"/>}
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="py-6 px-10 border-b border-gray-400 border-opacity-30">
            <div className="flex">
                <div className="w-1/6">
                    <span className="block text-gray-700">Alamat</span>
                </div>
                <div className="w-5/6">
                    <div className="relative bg-gray-200 py-4 border-b border-dotted border-gray-500">
                        <div onClick={() => toggleDropdown('provinsi')} className="flex px-4 items-center justify-between">
                            <span className="bg-gray-200 text-gray-500 outline-none w-full">
                                {selProvinsi.title}
                            </span>
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" fill="currentColor"/>
                        </div>
                        {
                            (dropdown && service === 'provinsi') && <div className="absolute z-10 w-full mt-5 bg-white shadow">
                                <ul className="overflow-scroll h-56">
                                    {dataArray.map((item) => {
                                        return (
                                            <li className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center" key={item.id} onClick={(e)=> {handleSetProvince(item)}}>
                                                {item.title}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="relative bg-gray-200 mt-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Jenis Kelamin</span> */}
                        <div onClick={() => toggleDropdown('kota')} className="flex px-4 items-center justify-between">
                            <span className="bg-gray-200 text-gray-500 outline-none w-full">
                                {selKota.title}
                            </span>
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" fill="currentColor"/>
                        </div>
                        {
                            (dropdown && service === 'kota') && <div className="absolute z-10 w-full mt-5 bg-white">
                                <ul className="overflow-scroll h-56">
                                    {dataArrayCity.map((item) => {
                                        return (
                                            <li className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center" key={item.id} onClick={(e)=> {handleSetCity(item)}}>
                                                {item.title}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="relative bg-gray-200 mt-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Jenis Kelamin</span> */}
                        <div onClick={() => toggleDropdown('kec')} className="flex px-4 items-center justify-between">
                            <span className="bg-gray-200 text-gray-500 outline-none w-full">
                                {selKec.title}
                            </span>
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" fill="currentColor"/>
                        </div>
                        {
                            (dropdown && service === 'kec') && <div className="absolute z-10 w-full mt-5 bg-white">
                                <ul className="overflow-scroll h-56">
                                    {dataArrayDistrict.map((item) => {
                                        return (
                                            <li className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center" key={item.id} onClick={(e)=> {handleSetDistrict(item)}}>
                                                {item.title}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="relative bg-gray-200 mt-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Jenis Kelamin</span> */}
                        <div onClick={() => toggleDropdown('kel')} className="flex px-4 items-center justify-between">
                            <span className="bg-gray-200 text-gray-500 outline-none w-full">
                                {selKel.village}
                            </span>
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" fill="currentColor"/>
                        </div>
                        {
                            (dropdown && service === 'kel') && <div className="absolute z-10 w-full mt-5 bg-white">
                                <ul className="overflow-scroll h-56">
                                    {dataZipCode.map((item) => {
                                        return (
                                            <li className="px-4 py-2 flex hover:bg-blue-500 hover:text-white justify-between items-center" key={item.id} onClick={(e)=> {handleZipCode(item)}}>
                                                {item.village}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="bg-gray-200 mt-4 px-4 py-4 border-b border-dotted border-gray-500">
                        {/* <span className="block text-gray-500">Alamat</span> */}
                        <input placeholder="Alamat"
                            className="bg-gray-200 text-gray-500 outline-none w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-2/3 mb-8 mx-36">
            <button className="mt-6 py-2 w-full font-bold bg-blue-700 rounded-full uppercase text-white">
                Ubah Profile
            </button>
        </div>
        </div>
    )
  }
  
  export default ValueOverview