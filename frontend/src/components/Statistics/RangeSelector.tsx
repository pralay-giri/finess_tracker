interface RANGESELECTOR_PROPS {
    dateInterval: string
    setDateInterval: React.Dispatch<React.SetStateAction<string>>
}
const RangeSelector = ({
    dateInterval,
    setDateInterval,
}: RANGESELECTOR_PROPS) => {
    return (
        <select
            name='statTime'
            onChange={(e) => setDateInterval(e.target.value)}
            value={dateInterval}
            className='md:px-2 py-1 text-theme-bg-dark text-sm md:text-md cursor-pointer outline-none border-2 border-theme-bg-dark rounded-md hover:border-theme-color-blue hover:opacity-85 focus-visible:border-theme-color-blue focus-visible:shadow-sm focus-visible:shadow-theme-color-blue focus-visible:opacity-85'
        >
            <optgroup label='DAY'>
                <option value='1 DAY'>1 DAY</option>
                <option value='2 DAY'>2 DAY</option>
                <option value='6 DAY'>6 DAY</option>
            </optgroup>
            <optgroup label='MONTH'>
                <option value='1 MONTH'>1 MONTH</option>
                <option value='2 MONTH'>2 MONTH</option>
                <option value='6 MONTH'>6 MONTH</option>
            </optgroup>
            <optgroup label='YEAR'>
                <option value='1 YEAR'>1 YEAR</option>
                <option value='2 YEAR'>2 YEAR</option>
                <option value='6 YEAR'>6 YEAR</option>
            </optgroup>
        </select>
    )
}

export default RangeSelector
