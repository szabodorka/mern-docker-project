import TokenDetails from "./TokenDetails";

export default function ChosenToken({ selectedToken }) {

    console.log(selectedToken);


    return (

        <div>
            <TokenDetails selectedToken={selectedToken}/>
        </div>


    )

}