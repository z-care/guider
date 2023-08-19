import {
    Autocomplete as MuiAutocomplete,
    AutocompleteProps as MuiAutocompleteProps,
    SxProps,
    TextField,
    Theme
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"


export interface AutocompleteProps {
    className?: string
    sx?: SxProps<Theme>
    label?: string
    onChosen?: (data: any) => void
    onSuggestionFind?: (data: any) => void
}


const Autocomplete = ({ className, sx, label, onChosen, onSuggestionFind }: AutocompleteProps) => {
    const [value, setValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [suggestion, setSuggestion] = useState<any[]>([]);


    useEffect(() => {
        if (inputValue && inputValue.length >= 3) {
            setTimeout(() => {
                fetch("/api/autocomplete", {
                    method: "POST",
                    body: JSON.stringify({ text: inputValue })
                }).then(data => data.json())
                    .then(data => {
                        if(onSuggestionFind) onSuggestionFind(data)
                        setSuggestion(data?.features?.map((item: any) => item?.properties?.label) || []) 
                    })
            }, 500)
        }
    }, [inputValue])


    return (
        <MuiAutocomplete
            className={className}
            value={value}
            onChange={(event: any, newValue: string | null) => {
                setValue(newValue)
                if (onChosen) onChosen(newValue as any)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={suggestion}
            sx={sx}
            renderInput={(params) => <TextField {...params} label={label} variant="standard" />}
        />
    )
}


export default Autocomplete