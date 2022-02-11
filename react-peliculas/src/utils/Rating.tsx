import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AutenticacionContext from '../contexts/AutenticacionContext'
import '../styles/utils/Rating.css'
import Swal from 'sweetalert2'
const Rating = (props: ratingProps) => {
const {claims} = useContext(AutenticacionContext)
    const [maxValueArr, setMacValueArr] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);

    useEffect(() => {

        setMacValueArr(Array(props.maxValue).fill(0))

    }, [props.maxValue]);

    const handleMouseover = (vote: number) => {
        setSelectedValue(vote);
    }

    const handleClick = (vote: number) => {
        if(claims.length === 0)
        {
            Swal.fire({
                title:"Error",
                text:"Dbes loguearte para votar", icon:"error",
                
            });
            return;
        }
        setSelectedValue(vote);
        props.onChange(vote);
    }
    return (<>
        {
            maxValueArr.map((value, index) => (
                <FontAwesomeIcon
                    icon="star"
                    key={index}
                    onClick={()=> handleClick(index+1)}
                    onMouseOver={() => handleMouseover(index + 1)}
                    className={`fa-lg poiter ${selectedValue >= index+1 ? 'checked' : null}`}
                />
            ))
        }</>
    )
}
export default Rating;
interface ratingProps {

    maxValue: number;
    selectedValue: number;
    onChange(vote: number): void;

}
function AuthenticationContext(AuthenticationContext: any): { claims: any } {
    throw new Error('Function not implemented.')
}

