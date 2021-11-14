# lightning-probot

A GitHub App built with [Probot](https://github.com/probot/probot) that implements bot actions for PyTorch Lightning.

Forked from https://github.com/pytorch/probot.

## auto-cc-bot

Add an issue to your project like https://github.com/pytorch/pytorch/issues/24422
and add a `.github/pytorch-probot.yml` file with:

```yml
tracking_issue: 24422
```

Based on who is listed in the tracking issue, the bot will automatically
CC people when labels are added to an issue.

## auto-label-bot (currently unused)

* If an issue is labeled **high priority**, also label it
  **triage review**
* If an issue is labeled **topic: flaky-tests**, also label it
  **high priority** and **triage review**
* If an issue or pull request contains a regex in its title, label
  it accordingly, e.g., a title containing 'ROCm' would yield the
  **module: rocm** label.

## Setup

```sh
# Install dependencies
yarn install

# Run the tests
yarn test

# Run the bot
yarn start
```

## Live testing as a GitHub App

If you want to smoketest the bot on a test repository, you'll need to
create a GitHub app.  Go to the webpage from probot; it will walk
through the process.

## Deploying GitHub Actions

Follow the instructions at
https://github.com/actions/toolkit/blob/master/docs/action-versioning.md

## Contributing

If you feel like an improvement could be made, please open an issue in the PyTorch Lightning repository instead.

https://github.com/PyTorchLightning/pytorch-lightning

## License

[ISC](LICENSE) © 2019 Edward Z. Yang <ezyang@fb.com> (https://pytorch.org), 2021 Carlos Mocholí <carlos@grid.ai> (https://pytorchlightning.ai)
