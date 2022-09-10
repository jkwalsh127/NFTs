import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function RadioButtons({ handleConnectionMethodChange }) {

    return (
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" onClick={() => handleConnectionMethodChange("")}/>
        <FormControlLabel value="male" control={<Radio />} label="Male" onClick={() => handleConnectionMethodChange("")}/>
        <FormControlLabel value="other" control={<Radio />} label="Other" onClick={() => handleConnectionMethodChange("")}/>
      </RadioGroup>
    )
}