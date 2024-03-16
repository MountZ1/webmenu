interface ColoredLineProps {
    color : string,
}
const ColoredLine : React.FC<ColoredLineProps> = ({ color }) => (
    <hr
        style={{
            backgroundColor: color,
            height: 1,
            width: '90%',
            alignContent: 'center',
        }}
    />
);

export default ColoredLine