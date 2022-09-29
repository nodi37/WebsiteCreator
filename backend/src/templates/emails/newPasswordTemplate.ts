const newPasswordTemplate = (plainTextPass: string): string => {
return `
<pre>
<b>Hello!</b>
<p>
This is your new password in delator: ${plainTextPass}
</p>
</pre>
`

}

export default newPasswordTemplate;