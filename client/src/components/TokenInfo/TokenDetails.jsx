export default function TokenDetails ({selectedToken}) {

    return (

        <div className="tokenDetails">
            <div className= "mainDetails">
                <img className = "tokenDetailsImg"src = {selectedToken.image}></img> 
                <p>{selectedToken.name} {selectedToken.symbol.toUpperCase()}</p>
                <h2>{selectedToken.current_price}</h2>
                <button>Add to portfolio</button>

                <ul>

                <span>Market cap: ${selectedToken.market_cap}</span>


                </ul>

            </div>
    
            
        </div>
    )
}