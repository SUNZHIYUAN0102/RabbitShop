<script>
export default {
  name: 'xtxTabs',
  render () {
    const name = 'tom'
    const title = 'tom12'

    const say = () => {
      console.log('hi jsx')
    }

    const sub = [<sub>123</sub>, <sub>456</sub>]

    return (
      <h1 title={title} onClick={say}>
        {name}
        {sub}
      </h1>
    )
  }
}
</script>

<style lang="less" scoped>
</style>
