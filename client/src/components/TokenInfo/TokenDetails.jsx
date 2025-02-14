export default function TokenDetails ({selectedToken}) {

    return (

        <div className="tokenDetails">
            <div className= "mainDetails">

                <p>{selectedToken.name} {selectedToken.symbol.toUpperCase()}</p>

            </div>

        </div>

    )


}