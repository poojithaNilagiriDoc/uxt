# UX Toolkit for React

A toolkit of UI components, services, and styles for React.

**Documentation & Demos:** http://ux.ingrnet.com/uxt-react

**Release Notes:** http://ux.ingrnet.com/uxt/#/blog/latest

## Contributing

Since the UXT team is small, we need contributions from passionate PPM developers to help grow and evolve UXT offerings. We welcome anyone who wants to contribute bugfixes and improvements.

To learn more, take a look at our general [Contributing Guide](https://dev.azure.com/hexagonPPMInnerSource/_git/uxt?path=%2FCONTRIBUTING.md&version=GBmaster&_a=contents) for more information.

To release a new version of the package, you must first be an administrator of the project. Then you can simply use the [npm version](https://docs.npmjs.com/cli/version) command to set the new patch, minor, or major version and create a commit and git tag at that new version. Finally ensure that all dependencies are installed and run the [npm publish](https://docs.npmjs.com/cli/publish) command. The prepublish script will automatically run and build the project before publishing.


# Getting Node packages

[NPM](http://npmjs.org/) is the leading package management tool for client and server JavaScript development, and is included when you install [Node.js](https://nodejs.org/). It is fully cross-platform and does not require you to use Node in your project. If you are unfamiliar with NPM, information on getting started can be found [here](https://docs.npmjs.com/).

# Getting the Toolkit

UXT for React is distributed through a private NPM registry hosted on the corporate network. Before you can install the **uxt-react** package, you must configure NPM to connect to this registry.

For instructions on setting the registry, visit our [internal NPM server webpage](https://dev.azure.com/hexagonPPMInnerSource/PPM/_packaging?feedName=PPM&protocolType=Npm), press the "Connect to feed" button in the upper right, and select the **npm** tab.

After the registry is set, you can install UXT for React and the core UXT styles in your project with the following command.

```bash
npm install --save uxt-react
```

To use UX Toolkit components, simply import them like you do with your own components.

```javascript
import Sidebar from 'uxt-react/components/Sidebar';
```

UX Toolkit components use the [Material UI Styles](https://material-ui.com/styles/basics/) library for styling, allowing us to support runtime theme switching and simple style overrides. Each component's page in the documentation includes demos for showing how the components can be used, and a reference to the props and class names that can be used to customize them.

UXT for React styles are designed to work with the [Roboto font](https://fonts.google.com/specimen/Roboto).

# Building the Shell

You should use the following Shell structure, without overriding the behavior of the elements.

```javascript
<Shell>
  <Topbar/>
  <ShellMain>
    <Sidebar/>
    <ShellContent>
      // Main content goes here
    </ShellContent>
  </div>
</div>
```

Each piece of the shell is required to ensure a consistent look and behavior across all web applications.
