import React from 'react';
import Template from '../../Template/template';
import { useEffect } from 'react';
import axiosInstance from '../../components/AxiosInstance';
import { useState } from 'react';
import { CurrencyFormat } from '../../Helpers/CurrencyFormat';


const Home = () => {

    const kurirData = [{ id: 'jne', name: 'JNE' }, { id: 'pos', name: 'POS Indonesia' }, { id: 'tiki', name: 'TIKI' }];

    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [listKurir, setListKurir] = useState(kurirData)
    const [kurir, setKurir] = useState()
    const [weight, setWeight] = useState()
    const [origin, setOrigin] = useState()
    const [destination, setDestination] = useState()
    const [result, setResult] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        getProvince();
    }, []);


    const onChooseProvince = (e) => {
        getCity(e.value)
    }

    const onChooseOrigin = (e) => {
        setOrigin(e.value)
    }
    const onChooseDestination = (e) => {
        setDestination(e.value)
    }

    const getProvince = () => {
        axiosInstance.get('province').then((response) => {
            setProvinces(response.data.rajaongkir.results);
        }).catch((error) => {
            console.log('error', error);
        })
    }
    const getCity = (id) => {
        axiosInstance.get(`city/${id}`).then((response) => {
            setCities(response.data.rajaongkir.results);
        }).catch((error) => {
            console.log('error', error);
        })
    }



    const handleCek = () => {
        axiosInstance.get(`cost?origin=${origin}&destination=${destination}&weight=${weight}&courier=${kurir}`).then((response) => {
            setResult(response.data.rajaongkir.results);
            console.log(response.data.rajaongkir.results);
            setModal(true);
        }).catch((error) => {
            console.log('error', error);
        })
    }


    return (
        <Template>
            <div className='w-50'>
                <form className=''>
                    <h5>Alamat Asal</h5>
                    <div>
                        <label>Provinsi</label>
                        <br />
                        <select name="" className='input' id="" onChange={(e) => onChooseProvince(e.target)}>
                            <option value="">--Pilih--</option>
                            {provinces.length > 0 && provinces.map((item, index) => (
                                <option value={item.province_id} key={index}>{item.province}</option>
                            ))}
                        </select>
                    </div>
                    <div className=''>
                        <label>Kota</label>
                        <br />
                        <select name="" className='input' id="" onChange={(e) => onChooseOrigin(e.target)}>
                            <option value="">--Pilih--</option>
                            {cities.length > 0 && cities.map((item, index) => (
                                <option value={item.city_id} key={index}>{item.city_name}</option>
                            ))}
                        </select>
                    </div>
                    <h5>Alamat Tujuan</h5>
                    <div className=''>
                        <label>Provinsi</label>
                        <br />
                        <select name="" className='input' id="" onChange={(e) => onChooseProvince(e.target)}>
                            <option value="">--Pilih--</option>
                            {provinces.length > 0 && provinces.map((item, index) => (
                                <option value={item.province_id} key={index}>{item.province}</option>
                            ))}
                        </select>
                    </div>
                    <div className=''>
                        <label>Kota</label>
                        <br />
                        <select name="" className='input' id="" onChange={(e) => onChooseDestination(e.target)}>
                            <option value="">--Pilih--</option>
                            {cities.length > 0 && cities.map((item, index) => (
                                <option value={item.city_id} key={index}>{item.city_name}</option>
                            ))}
                        </select>
                    </div>
                    <h5>Alamat Tujuan</h5>
                    <div className=''>
                        <label>Berat Barang (kg)</label>
                        <br />
                        <input className='input' type='number' name='' id='' onChange={(e) => setWeight(e.target.value)} placeholder='berat ...' />
                    </div>
                    <h5>Pilih Kurir</h5>
                    <div className=''>
                        <select className='input' name='' id='' onChange={(e) => setKurir(e.target.value)}>
                            <option value="">--Pilih--</option>
                            {listKurir.length > 0 && listKurir.map((item, index) => (
                                <option value={item.id} key={index}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className>
                        <button type='button' className='button' onClick={handleCek} >Cek</button>
                    </div>
                </form>
            </div>
            {modal &&
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModal(!modal)}>&times;</span>
                        <h2>Hasil Cek Ongkir</h2>
                        {result.length > 0 && result.map((item, i) => (
                            <div>
                                <p style={{ fontWeight: "bold" }}>{item.name}</p>
                                {item.costs.map((cost, i) => (
                                    <div key={i}>
                                        <p style={{ fontWeight: "bold" }}>{cost.service}</p>
                                        <span>{cost.description}</span>
                                        {cost.cost.map((a, index) => (
                                            <div key={index}>
                                                <span>Rp{CurrencyFormat(a.value)}</span>
                                                <br />
                                                <span>estimasi {a.etd} hari</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
            }
        </Template>
    );
}

export default Home;
