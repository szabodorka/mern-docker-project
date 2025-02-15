import TokenDetails from "./TokenDetails";

export default function ChosenToken({ selectedToken }) {


    return (
        <div>
            <TokenDetails selectedToken={selectedToken}/>
        </div>
    )

}