import { ImageList, ImageListItem,Box, ImageListItemBar } from "@mui/material";

const itemData = [
  { img: "https://picsum.photos/300/200?1", title: "Image 1" },
  { img: "https://picsum.photos/300/200?2", title: "Image 2" },
  { img: "https://picsum.photos/300/200?3", title: "Image 3" },
  { img: "https://picsum.photos/300/200?4", title: "Image 4" },
  { img: "https://picsum.photos/300/200?5", title: "Image 5" },
  { img: "https://picsum.photos/300/200?6", title: "Image 6" },
  { img: "https://picsum.photos/300/200?7", title: "Image 7" },
  { img: "https://picsum.photos/300/200?8", title: "Image 8" },
  { img: "https://picsum.photos/300/200?9", title: "Image 9" },
  { img: "https://picsum.photos/300/200?10", title: "Image 10" },
];

export default function ImageListEg() {
  return (
    <>
    <ImageList sx={{ width: 500, height:300 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} />
        </ImageListItem>
      ))}
    </ImageList>

    <ImageList variant="woven" sx={{ width: 500, height:300 }} cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
          
        </ImageListItem>
        
      ))}
    </ImageList>
    <Box sx={{ width: 500, height:300,overflowY:'scroll' }}> 
      <ImageList variant="masonry"  cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=240`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Box>
    </>
  );
}
