import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	TextDocumentSyncKind,
	InitializeResult,
	ColorInformation,
	DocumentColorParams,
	ColorPresentationParams,
	ColorPresentation,
	DidChangeTextDocumentParams
} from 'vscode-languageserver';
import colorParser from '@kurkle/color';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

let regex = /#([\da-f]{3}){1,2}\b|^#([\da-f]{4}){1,2}\b|\b(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)|\bblack\b|\bsilver\b|\bgray\b|\bwhitesmoke\b|\bmaroon\b|\bred\b|\bpurple\b|\bfuchsia\b|\bgreen\b|\blime\b|\bolivedrab\b|\byellow\b|\bnavy\b|\bblue\b|\bteal\b|\baquamarine\b|\borange\b|\baliceblue\b|\bantiquewhite\b|\baqua\b|\bazure\b|\bbeige\b|\bbisque\b|\bblanchedalmond\b|\bblueviolet\b|\bbrown\b|\bburlywood\b|\bcadetblue\b|\bchartreuse\b|\bchocolate\b|\bcoral\b|\bcornflowerblue\b|\bcornsilk\b|\bcrimson\b|\bcurrentcolor\b|\bdarkblue\b|\bdarkcyan\b|\bdarkgoldenrod\b|\bdarkgray\b|\bdarkgreen\b|\bdarkgrey\b|\bdarkkhaki\b|\bdarkmagenta\b|\bdarkolivegreen\b|\bdarkorange\b|\bdarkorchid\b|\bdarkred\b|\bdarksalmon\b|\bdarkseagreen\b|\bdarkslateblue\b|\bdarkslategray\b|\bdarkslategrey\b|\bdarkturquoise\b|\bdarkviolet\b|\bdeeppink\b|\bdeepskyblue\b|\bdimgray\b|\bdimgrey\b|\bdodgerblue\b|\bfirebrick\b|\bfloralwhite\b|\bforestgreen\b|\bgainsboro\b|\bghostwhite\b|\bgoldenrod\b|\bgold\b|\bgreenyellow\b|\bgrey\b|\bhoneydew\b|\bhotpink\b|\bindianred\b|\bindigo\b|\bivory\b|\bkhaki\b|\blavenderblush\b|\blavender\b|\blawngreen\b|\blemonchiffon\b|\blightblue\b|\blightcoral\b|\blightcyan\b|\blightgoldenrodyellow\b|\blightgray\b|\blightgreen\b|\blightgrey\b|\blightpink\b|\blightsalmon\b|\blightseagreen\b|\blightskyblue\b|\blightslategray\b|\blightslategrey\b|\blightsteelblue\b|\blightyellow\b|\blimegreen\b|\blinen\b|\bmediumaquamarine\b|\bmediumblue\b|\bmediumorchid\b|\bmediumpurple\b|\bmediumseagreen\b|\bmediumslateblue\b|\bmediumspringgreen\b|\bmediumturquoise\b|\bmediumvioletred\b|\bmidnightblue\b|\bmintcream\b|\bmistyrose\b|\bmoccasin\b|\bnavajowhite\b|\boldlace\b|\bolive\b|\borangered\b|\borchid\b|\bpalegoldenrod\b|\bpalegreen\b|\bpaleturquoise\b|\bpalevioletred\b|\bpapayawhip\b|\bpeachpuff\b|\bperu\b|\bpink\b|\bplum\b|\bpowderblue\b|\brosybrown\b|\broyalblue\b|\bsaddlebrown\b|\bsalmon\b|\bsandybrown\b|\bseagreen\b|\bseashell\b|\bsienna\b|\bskyblue\b|\bslateblue\b|\bslategray\b|\bslategrey\b|\bsnow\b|\bspringgreen\b|\bsteelblue\b|\btan\b|\bthistle\b|\btomato\b|\btransparent\b|\bturquoise\b|\bviolet\b|\bwheat\b|\bwhite\b|\byellowgreen\b|\brebeccapurple\b/ig;
let connection = createConnection(ProposedFeatures.all);

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

let colors: ColorInformation[] = [];

enum Case {
	Uppercase = 'Uppercase',
	Lowercase = 'Lowercase'
}

interface Config {
	maxNumberOfColorsToDisplayPerDocument: number;
	colorCase: Case;
}

const defaultSettings: Config = {
	maxNumberOfColorsToDisplayPerDocument: -1,
	colorCase: Case.Uppercase
};
let globalSettings: Config = defaultSettings;
let documentSettings: Map<string, Thenable<Config>> = new Map();


function getDocumentSettings(resource: string): Thenable<Config> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'colorPicker'
		});
		documentSettings.set(resource, result);
	}
	return result;
}
async function updateColors(textDocument: TextDocument): Promise<void> {

	let settings = await getDocumentSettings(textDocument.uri);
	let text = textDocument.getText();
	let m: RegExpExecArray | null;
	colors = [];
	let problems = 0;

	while ((m = regex.exec(text)) && (problems < settings.maxNumberOfColorsToDisplayPerDocument || settings.maxNumberOfColorsToDisplayPerDocument === -1)) {
		problems++;

		let rawColor = m[0];

		let parsedColor = colorParser(rawColor).rgb as any;

		const color = {} as any;
		color.red = parsedColor.r / 255;
		color.green = parsedColor.g / 255;
		color.blue = parsedColor.b / 255;
		color.alpha = parsedColor.a;

		colors.push({
			range: {
				start: textDocument.positionAt(m.index),
				end: textDocument.positionAt(m.index + rawColor.length)
			},
			color
		});
	}
}

function getColorPresentation(color: any, casing: Case = Case.Uppercase): string {
	function numberToPresentation(val: number, casing: Case): string {
		let result = Math.floor(val * 255).toString(16);
		result = result.length === 1 ? "0" + result : result;
		result = casing === Case.Lowercase ? result.toLowerCase() : result.toUpperCase();

		return result;
	}

	let result = "#";
	result += numberToPresentation(color.red, casing);
	result += numberToPresentation(color.green, casing);
	result += numberToPresentation(color.blue, casing);

	return result;
}


connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;

	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			colorProvider: true
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});


connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		documentSettings.clear();
	} else {
		globalSettings = <Config>(
			(change.settings.colorPicker || defaultSettings)
		);
	}

	documents.all().forEach(updateColors);
});

connection.onDidChangeTextDocument((change: DidChangeTextDocumentParams) => {
	const document = documents.get(change.textDocument.uri);
	if (document) {
		updateColors(document);
	}
});

documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent(async (change) => {
	await updateColors(change.document);
});

connection.onDocumentColor(async (params: DocumentColorParams): Promise<ColorInformation[]> => {
	const document = documents.get(params.textDocument.uri);
	if (!document) {
		return [];
	}
	await updateColors(document);

	return colors;
});

connection.onColorPresentation(async (params: ColorPresentationParams): Promise<ColorPresentation[]> => {
	let settings = await getDocumentSettings(params.textDocument.uri);
	return [{ label: getColorPresentation(params.color, settings.colorCase) }];
});


documents.listen(connection);

connection.listen();
