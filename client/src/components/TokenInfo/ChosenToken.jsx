import TokenDetails from "./TokenDetails";

export default function ChosenToken({ selectedToken }) {

    console.log(selectedToken);


    return (

        <div>

            <h1>{selectedToken.name}</h1>
            
            <TokenDetails selectedToken={selectedToken}/>

        </div>


    )

}