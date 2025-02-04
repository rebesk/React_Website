import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles({
  container: {
    display: 'flex', 
    justifyContent: 'center', 
    flexDirection: 'column', 
    width: '100vw', 
    height: '100vh', 
    alignItems: 'center', 
    background: 'linear-gradient(180deg, #eeeeee, #b2b2b2 , #7f7f7f, #4c4c4c )', 
  },
  content: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfViewer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    overflow: 'visible',
  },
  pdfPage: {

  },
  button: {
    margin: '0 10px',
    borderWidth: '0px',
    backgroundColor: 'transparent',
    color: '#eeeeee',
    fontSize: '32px',
    '&:hover': {
      color: 'white',
      cursor: 'pointer',
    },
  },
  text: {
    fontSize: '32px',
    marginTop: '150px',
  }
});

const CV: React.FC = () => {
  const classes = useStyles();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  const goToNextPage = () => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));

  return (
    <div className={classes.container}>

      <p className={classes.text}>CV</p>
      <div className={classes.content}>
        <Button className={classes.button} onClick={goToPrevPage}>
        <i className="bi bi-arrow-left-circle-fill"></i></Button>
        <div className={classes.pdfViewer}>
          <Document
            file="/cv.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} className={classes.pdfPage} />
          </Document>
        </div>
        <Button className={classes.button} onClick={goToNextPage}> 
          <i className="bi bi-arrow-right-circle-fill"></i>
        </Button>
      </div>
      <div>
        Page {pageNumber} of {numPages}
      </div>
    </div>
  );
};

export default CV;