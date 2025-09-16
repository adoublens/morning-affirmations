
1. Interface Composition Pattern
In theme.ts, look at the Theme interface:
Question: What do you notice about how Theme uses ThemeColors and ThemeFonts? What's this pattern called?
- the Theme is loading in additional interfaces for ThemeColors and ThemeFonts
- both ThemeColors and ThemeFonts have their own set of properties that can be elaborated on in ther own context (e.g. can have lots of properties that are specific to 'colors or 'themes')
- QUESTION: is the pattern called inheritance?

2. Optional Properties
In ui.ts, look at BaseComponentProps:
Question: What do those ? marks mean? Why might some properties be optional?
- ? means it's optional to populate those properties
- some properties might be optional because the data might not be available/provided for them, while they must be provided for others in order for the functionality to work


3. Interface Extension
Look at how LoadingProps extends BaseComponentProps:
Question: What does extends do here? What properties will LoadingProps have in total?
- extends probably takes the entirety of BaseComponentProps and adds/loads it into LoadingProps
- then you can add more properties to LoadingProps that are specific to it
- maybe it's a quick way to scaffold/create an interface without repeating all of the same properties as an existing one (if there's overlap)
- it probably reduces the amount of duplication of code as well
- QUESTION: Is 'extends' a type of inheritance?


4. Nested Object Types
In ThemeColors, look at the text property:
Question: How is this different from creating a separate ThemeText interface? What are the trade-offs?
- If the text properties are only ever going to be used once and/or in related to THemeColors, then maybe it makes sense to embed theme there
- It's also easier to read/follow the code because you don't have to jump to another inheritance to see what properties are related to Text Color
- mabye it's easier to write as well (e.g. text.primary, text.secondary) - would 'code hinting' appear as soon as you write 'text'? If so then that makes coding easier as well.
- QUESTION: are there performance/speed considerations with this approach?