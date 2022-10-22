const newPasswordTemplate = (plainTextPass: string): string => {
return `
<pre>
<b>Hello!</b>
<p>
This is your new password to website control panel: ${plainTextPass}
</p>
</pre>
`

}

export default newPasswordTemplate;