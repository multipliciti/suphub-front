import { TeamMember } from '@/types/services/projectTeam';
interface HslType {
	h: number;
	s: number;
	l: number;
}

export function getInitials(member: TeamMember) {
	const { firstName, lastName, email } = member;

	if (firstName && lastName) {
		return `${firstName.charAt(0)}.${lastName.charAt(0)}.`;
	} else if (email) {
		return `${email.charAt(0)}.${email.charAt(1)}.`;
	}
	return '';
}

export function getName(member: TeamMember) {
	const { firstName, lastName, email } = member;

	return firstName === null && lastName === null
		? email
		: `${firstName ?? ''} ${lastName ?? ''}`.trim();
}

export const getColorFromText = (text: string) => {
	const hash = stringToHash(text);
	const hslColor = hashToHsl(hash);
	const adjustedHslColor = adjustLightness(hslColor);
	return hslToHex(adjustedHslColor);
};

// Simple hash function
const stringToHash = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
};

// Convert hash to HSL color
const hashToHsl = (hash: number) => {
	let h = ((hash % 360) + 360) % 360; // Ensure hue is in [0, 360)
	// Adjust the hue to avoid yellow (50-60 degrees)
	if (h >= 50 && h <= 60) {
		h = (h + 60) % 360; // Shift hue by 60 degrees
	}
	const s = 60 + (hash % 40); // Saturation in [60, 100)
	const l = 50; // Fixed lightness
	return { h, s, l };
};
// Ensure good contrast with white text by adjusting lightness
const adjustLightness = (hsl: HslType) => {
	const adjustedL = hsl.l > 70 ? hsl.l - 30 : hsl.l + 30;
	return { ...hsl, l: adjustedL };
};

// Convert HSL to hex
const hslToHex = (hsl: HslType) => {
	const { h, s, l } = hsl;
	const sFraction = s / 100;
	const lFraction = l / 100;

	const c = (1 - Math.abs(2 * lFraction - 1)) * sFraction;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = lFraction - c / 2;

	let r = 0,
		g = 0,
		b = 0;
	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	const toHex = (value: number) => {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
