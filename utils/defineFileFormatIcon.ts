import AI from '@/imgs/FileFormatIcons/AI.svg';
import AVI from '@/imgs/FileFormatIcons/AVI.svg';
import BMP from '@/imgs/FileFormatIcons/BMP.svg';
import CRD from '@/imgs/FileFormatIcons/CRD.svg';
import CSV from '@/imgs/FileFormatIcons/CSV.svg';
import DLL from '@/imgs/FileFormatIcons/DLL.svg';
import DOC from '@/imgs/FileFormatIcons/DOC.svg';
import DOCX from '@/imgs/FileFormatIcons/DOCX.svg';
import DWG from '@/imgs/FileFormatIcons/DWG.svg';
import EPS from '@/imgs/FileFormatIcons/EPS.svg';
import EXE from '@/imgs/FileFormatIcons/EXE.svg';
import FLV from '@/imgs/FileFormatIcons/FLV.svg';
import GIF from '@/imgs/FileFormatIcons/GIF.svg';
import HTML from '@/imgs/FileFormatIcons/HTML.svg';
import ISO from '@/imgs/FileFormatIcons/ISO.svg';
import JAVA from '@/imgs/FileFormatIcons/JAVA.svg';
import JPG from '@/imgs/FileFormatIcons/JPG.svg';
import MDB from '@/imgs/FileFormatIcons/MDB.svg';
import MID from '@/imgs/FileFormatIcons/MID.svg';
import MOV from '@/imgs/FileFormatIcons/MOV.svg';
import MP3 from '@/imgs/FileFormatIcons/MP3.svg';
import MP4 from '@/imgs/FileFormatIcons/MP4.svg';
import MPEG from '@/imgs/FileFormatIcons/MPEG.svg';
import PDF from '@/imgs/FileFormatIcons/PDF.svg';
import PNG from '@/imgs/FileFormatIcons/PNG.svg';
import PPT from '@/imgs/FileFormatIcons/PPT.svg';
import PS from '@/imgs/FileFormatIcons/PS.svg';
import PSD from '@/imgs/FileFormatIcons/PSD.svg';
import PUB from '@/imgs/FileFormatIcons/PUB.svg';
import RAR from '@/imgs/FileFormatIcons/RAR.svg';
import RAW from '@/imgs/FileFormatIcons/RAW.svg';
import RSS from '@/imgs/FileFormatIcons/RSS.svg';
import SVG from '@/imgs/FileFormatIcons/SVG.svg';
import TIFF from '@/imgs/FileFormatIcons/TIFF.svg';
import TXT from '@/imgs/FileFormatIcons/TXT.svg';
import WAV from '@/imgs/FileFormatIcons/WAV.svg';
import WMA from '@/imgs/FileFormatIcons/WMA.svg';
import XML from '@/imgs/FileFormatIcons/XML.svg';
import XSL from '@/imgs/FileFormatIcons/XSL.svg';
import ZIP from '@/imgs/FileFormatIcons/ZIP.svg';
import uploadIcon from '@/imgs/Buyer&Seller/upload_icon.svg';

export function shortenFilename(filename: string, length = 9) {
	try {
		if (filename.length > length) {
			return filename.slice(0, length - 2) + '...';
		} else {
			return filename;
		}
	} catch (e) {
		return filename;
	}
}
export function getImageFilePath(filename: string): string {
	const fileFormats: Record<string, string> = {
		AI,
		AVI,
		BMP,
		CRD,
		CSV,
		DLL,
		DOC,
		DOCX,
		DWG,
		EPS,
		EXE,
		FLV,
		GIF,
		HTML,
		ISO,
		JAVA,
		JPG,
		MDB,
		MID,
		MOV,
		MP3,
		MP4,
		MPEG,
		PDF,
		PNG,
		PPT,
		PS,
		PSD,
		PUB,
		RAR,
		RAW,
		RSS,
		SVG,
		TIFF,
		TXT,
		WAV,
		WMA,
		XML,
		XSL,
		ZIP,
	};

	try {
		const format: string = filename.split('.').pop()?.toUpperCase() || '';

		if (fileFormats[format]) {
			return fileFormats[format];
		} else {
			return uploadIcon;
		}
	} catch (e) {
		return uploadIcon;
	}
}
