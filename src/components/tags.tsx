interface TagProps {
	tagName: string,
	bgColor: string,
	fgColor: string,
}


export default function Tag(props: TagProps) {
  return (
    <span 
      className='text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'
			style={{
				backgroundColor: `#${props.bgColor}`,
				color: `#${props.fgColor}`,
			}}
    >
			{props.tagName}
    </span>
  );
}
