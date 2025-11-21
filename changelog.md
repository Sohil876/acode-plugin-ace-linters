# ChangeLogs

## `v1.0.6`

- Add python support
- Enable all supported features, update README with feature table
- Remove XML, PHP from formatter list
- Optimize build for balance between stability and size reduction

## `v1.0.5`

- Fixed plugin always disabled after install by switching build to IIFE
- Fixed XML lint issues
- Fixed disable/remove plugin logic

## `v1.0.4`

- Use new reworked worker instead of workerblob method
- Remove unnecessary javascript service from worker, typescript service already provides javascript mode
- Use custom typescript class and set default sane options for javascript mode
- Only build new worker instead of shipping seperate service files, reducing plugin size

## `v1.0.3`

- Fixed LanguageProvider
- Rework the worker
- Use ace-lua-linter instead of lua-service for lua linting and formatting

## `v1.0.2`

- Bug fixes

## `v1.0.1`

- Reduced plugin size massively

## `v1.0.0`

- Initial release
