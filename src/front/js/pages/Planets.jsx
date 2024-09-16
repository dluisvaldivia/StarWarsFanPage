import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from 'react-router-dom';

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleImgError = (event) => { event.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"; }
    const toggleFavorite = (item) => {
        const isFavorite = store.favorites.find(fav => fav.uid === item.uid && fav.type === "Planet");
        if (isFavorite) {
            actions.removeFromFavorites({ ...item, type: "Planet" });
        } else {
            actions.addToFavorites({ ...item, type: "Planet" });
        }
    };
    return (
        <div className="container bg-dark bg-gradient">
            <h1 className="text-info">Planets</h1>
            <div className="row">
                {store.planets.map((item) => (
                    <div className="col-md-3" key={item.uid}>
                        <div className="card mb-3"  >
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} className="card-img-top img-fluid" alt={item.name} style={{ height: '250px', objectFit: 'cover' }} onError={handleImgError} />
                            <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: '120px' }}>
                                <h4 className="card-title">{item.name}</h4>
                                <button type="button" className="btn btn-info" onClick={() => { handleDetails(item.uid) }}>DETAILS</button>
                                <button type="button" onClick={() => toggleFavorite(item)}>
                                    {store.favorites.find(fav => fav.uid === item.uid && fav.type === "Planet") ? '♥' : '♡'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}