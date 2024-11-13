import { describe, expect, it } from "vitest";
import { parsePartnersFromFile } from "./parse-file";

const line1 =
	'{"latitude": "42.000000", "partner_id": 2, "name": "Ivan Ivanov", "longitude": "24.111111"}';
const line2 =
	'{"latitude": "42.111111", "partner_id": 1, "name": "Georgi Georgiev", "longitude": "24.000000"}';
const invalidLine1 = JSON.stringify({
	...JSON.parse(line1),
	latitude: 123456,
});
const invalidLine2 = JSON.stringify({
	...JSON.parse(line2),
	name: undefined,
});

describe("parsePartnersFromFile", () => {
	it("returns an empty array for empty file content", () => {
		const fileContent = "";
		const result = parsePartnersFromFile(fileContent);
		expect(result).toEqual([]);
	});
	it("parses a single valid partner correctly", () => {
		const fileContent = line1;
		const result = parsePartnersFromFile(fileContent);
		expect(result).toEqual([expect.objectContaining(JSON.parse(line1))]);
	});
	it("parses multiple valid partners correctly", () => {
		const fileContent = `${line1}\n${line2}`;
		const result = parsePartnersFromFile(fileContent);
		expect(result).toEqual([
			expect.objectContaining(JSON.parse(line1)),
			expect.objectContaining(JSON.parse(line2)),
		]);
	});
	it("throws an error for an invalid json", () => {
		const fileContent = `${line1}\ninvalid json\n${line2}`;
		expect(() => parsePartnersFromFile(fileContent)).toThrowError();
	});
	it("throws an error for a single invalid partner", () => {
		const fileContent = `${line1}\n${invalidLine2}`;
		expect(() => parsePartnersFromFile(fileContent)).toThrowError();
	});
	it("throws an error for multiple invalid partners", () => {
		const fileContent = `${invalidLine1}\n${invalidLine2}`;
		expect(() => parsePartnersFromFile(fileContent)).toThrowError();
	});
	it("throws an error for a mix of valid and invalid partners", () => {
		const fileContent =
			'{"id": 1, "name": "John Doe"}\n{"id": 2, "name": "Jane Doe", "invalidField": "value"}';
		expect(() => parsePartnersFromFile(fileContent)).toThrowError();
	});
	it("ignores empty lines in file content", () => {
		const fileContent = `\n\n${line1}\n\n`;
		const result = parsePartnersFromFile(fileContent);
		expect(result).toEqual([expect.objectContaining(JSON.parse(line1))]);
	});
});
